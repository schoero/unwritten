import sharedRules from "@schoero/configs/eslint";
import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";
import eslintPluginJsonc from "eslint-plugin-jsonc";
import eslintPluginSortExports from "eslint-plugin-sort-exports";
import eslintPluginVitest from "eslint-plugin-vitest";


const indexImports = [
  {
    allowTypeImports: false,
    group: [
      "**/entities/*.js",
      "!**/entities/index.js",
      "**/types/*.js",
      "!**/types/index.js"
    ],
    message: "Import from the index file instead."
  }
];

const dependencyInjection = [
  {
    allowTypeImports: false,
    group: [
      "unwritten:platform/**/*.js",
      "**/platform/**/*.js",
      "node:*"
    ],
    message: "Use injected dependencies at 'ctx.dependencies' instead."
  },
  {
    allowTypeImports: true,
    group: [
      "typescript"
    ],
    message: "Use injected dependencies at 'ctx.dependencies' instead."
  }
];

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  ...sharedRules,

  {
    files: ["**/*.ts"],
    plugins: {
      "eslint-plugin-typescript": eslintPluginTypeScript,
      "eslint-plugin-vitest": eslintPluginVitest
    },
    rules: {
      "eslint-plugin-typescript/no-duplicate-type-constituents": "off",
      "eslint-plugin-typescript/no-restricted-imports": ["error", {
        patterns: [
          ...indexImports,
          ...dependencyInjection
        ]
      }],
      "eslint-plugin-vitest/no-identical-title": "off"
    }
  },
  {
    files: ["schemas/renderer/config.json"],
    plugins: {
      "eslint-plugin-jsonc": eslintPluginJsonc
    },
    rules: {
      "eslint-plugin-jsonc/sort-keys": "off"
    }
  },
  {
    files: [
      "**/typeguards/*.ts",
      "**/utils/*.ts",
      "**/interpreter/shared/jsdoc.ts"
    ],
    plugins: {
      "eslint-plugin-sort-exports": eslintPluginSortExports
    },
    rules: {
      "eslint-plugin-sort-exports/sort-exports": ["warn", { sortDir: "asc" }]
    }
  },
  {
    files: [
      "**/platform/**/browser.ts"
    ],
    plugins: {
      "eslint-plugin-typescript": eslintPluginTypeScript
    },
    rules: {
      "eslint-plugin-typescript/no-restricted-imports": ["error", {
        patterns: [
          {
            allowTypeImports: true,
            group: [
              "node:*"
            ]
          }
        ]
      }]
    }
  },
  {
    files: [
      "**/platform/**/node.ts"
    ],
    plugins: {
      "eslint-plugin-typescript": eslintPluginTypeScript
    },
    rules: {
      "eslint-plugin-typescript/no-restricted-imports": ["error", {
        patterns: [
          {
            allowTypeImports: true,
            group: [
              "!node:*"
            ]
          }
        ]
      }]
    }
  },
  {
    files: [
      "**/*.entry.ts",
      "**/*.test.ts",
      "**/*.test-d.ts",
      "**/tests/**/*.ts"
    ],
    plugins: {
      "eslint-plugin-typescript": eslintPluginTypeScript
    },
    rules: {
      "eslint-plugin-typescript/no-restricted-imports": ["error", {
        patterns: [
          {
            allowTypeImports: false,
            group: [
              "test",
              "node:test"
            ],
            message: "Import from vitest instead."
          },
          {
            allowTypeImports: false,
            group: [
              "!typescript"
            ]
          },
          {
            allowTypeImports: false,
            group: [
              "unwritten:platform/**/*.js",
              "**/platform/**/*.js",
              "!unwritten:platform/**/node.js",
              "!unwritten:platform/**/browser.js",
              "!unwritten:platform/file-system/virtual-fs.js",
              "node:*"
            ],
            message: "Use injected dependencies at 'ctx.dependencies' instead."
          }
        ]
      }]
    }
  },
  {
    files: [
      "**/renderer/markup/html/**/*.ts"
    ],
    plugins: {
      "eslint-plugin-typescript": eslintPluginTypeScript
    },
    rules: {
      "eslint-plugin-typescript/no-restricted-imports": ["error", {
        patterns: [
          ...dependencyInjection,
          ...indexImports,
          {
            group: [
              "unwritten:renderer:markdown*",
              "unwritten:renderer:markup/html*",
              "unwritten:renderer:markup/markdown*",
              "!unwritten:renderer:html*"
            ],
            message: "Import from markdown renderer is not allowed."
          }
        ]
      }]
    }
  },
  {
    files: [
      "**/renderer/markup/markdown/**/*.ts"
    ],
    plugins: {
      "eslint-plugin-typescript": eslintPluginTypeScript
    },
    rules: {
      "eslint-plugin-typescript/no-restricted-imports": ["error", {
        patterns: [
          ...dependencyInjection,
          ...indexImports,
          {
            group: [
              "unwritten:renderer:html*",
              "unwritten:renderer:markup/html*",
              "unwritten:renderer:markup/markdown*",
              "!unwritten:renderer:markdown*"
            ],
            message: "Import from html renderer is not allowed."
          }
        ]
      }]
    }
  }
];
