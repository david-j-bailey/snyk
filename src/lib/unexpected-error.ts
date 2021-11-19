/**
 * Ensures a given function does not throw any errors, including unexpected ones
 * outside of its execution.
 *
 * This function can only be used once in the same process. If you have multiple
 * callables needing this, compose them into a single callable.
 */
export async function callHandlingUnexpectedErrors(
  callable: () => Promise<unknown>,
  exitCode: number,
): Promise<void> {
  function handleUnexpectedError(reason: unknown): never {
    console.error('Something unexpected went wrong:', reason);
    console.error('Exit code:', exitCode);
    process.exit(exitCode);
  }

  /**
   * As the only point we'll know if a given callable has unexpected errors is
   * when NodeJS exits, we can't handle unexpected errors for more than one
   * callable. We'll never know which callable an error came from.
   */
  if (process.listenerCount('uncaughtException') > 1) {
    handleUnexpectedError(
      new Error('Cannot handle unexpected errors for more than one callable.'),
    );
  }

  process.on('uncaughtException', handleUnexpectedError);

  /**
   * Since Node 15, 'unhandledRejection' without a handler causes an
   * 'uncaughtException'. However, we also support Node 12 and 14 as of writing,
   * which don't have that behaviour. So we still need this handler for now.
   */
  process.on('unhandledRejection', handleUnexpectedError);

  try {
    await callable();
  } catch (e) {
    handleUnexpectedError(e);
  }

  /**
   * Do NOT remove 'uncaughtException' and 'unhandledRejection' handlers
   * at any point. There's never a point when everything's "done" and its safe
   * to remove them.
   *
   * These events only get called when NodeJS is about to exit the process. i.e.
   * when there's nothing left to execute. Adding steps to remove them gives
   * NodeJS something to execute. So they'll never get called when they need to!
   */
}
