import tsconfigPaths from "vite-tsconfig-paths";
import GithubActionsReporter from "vitest-github-actions-reporter";
import { defineConfig } from "vitest/config";


export default defineConfig({
  plugins: [
    tsconfigPaths()
  ],
  test: {
    reporters: process.env.GITHUB_ACTIONS
      ? ["verbose", new GithubActionsReporter()]
      : "default"
  }
});
