import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import GithubActionsReporter from "vitest-github-actions-reporter";

export default defineConfig({
  test: {
    reporters: process.env.GITHUB_ACTIONS
      ? new GithubActionsReporter()
      : "default"
  },
});