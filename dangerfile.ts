import { validateCommitMessages } from '@snyk/danger-rules/validateCommitMessages';
import { requireGeneratingHelpFiles } from '@snyk/danger-rules/requireGeneratingHelpFiles';
import { recommendWritingTest } from '@snyk/danger-rules/recommendWritingTest';
import { recommendJest } from '@snyk/danger-rules/recommendJest';
import { recommendRunningSmokeTests } from '@snyk/danger-rules/recommendRunningSmokeTests';
import { recommendMigratingModuleSyntax } from '@snyk/danger-rules/recommendMigratingModuleSyntax';

validateCommitMessages();
requireGeneratingHelpFiles();
recommendWritingTest();
recommendJest();
recommendRunningSmokeTests();
recommendMigratingModuleSyntax();
