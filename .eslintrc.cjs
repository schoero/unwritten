const dependencyInjection = [
  {
    allowTypeImports: false,
    group: [
      "unwritten:platform/**/*.js",
      "**/platform/**/*.js",
      "node:*"
    ],
    message: "Use injected dependencies at 'ctx.dependencies' instead."
  }, {
    allowTypeImports: true,
    group: [
      "typescript"
    ],
    message: "Use injected dependencies at 'ctx.dependencies' instead."
  }
];

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

module.exports = {
  extends: "@schoero",
  overrides: [
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2020
      },
      rules: {
        "@typescript-eslint/no-duplicate-type-constituents": "off",
        "@typescript-eslint/no-restricted-imports": [
          "error", {
            patterns: [
              ...indexImports,
              ...dependencyInjection
            ]
          }
        ],
        "vitest/no-identical-title": "off"
      }
    },
    {
      files: [
        "**/typeguards/*.ts",
        "**/utils/*.ts",
        "**/interpreter/shared/jsdoc.ts"
      ],
      parser: "@typescript-eslint/parser",
      rules: {
        "sort-exports/sort-exports": ["warn", { sortDir: "asc" }]
      }
    },
    {
      files: [
        "**/platform/**/browser.ts"
      ],
      parser: "@typescript-eslint/parser",
      rules: {
        "@typescript-eslint/no-restricted-imports": [
          "error", {
            patterns: [
              {
                allowTypeImports: true,
                group: [
                  "node:*"
                ]
              }
            ]
          }
        ]
      }
    },
    {
      files: [
        "**/platform/**/node.ts"
      ],
      parser: "@typescript-eslint/parser",
      rules: {
        "@typescript-eslint/no-restricted-imports": [
          "error", {
            patterns: [
              {
                allowTypeImports: true,
                group: [
                  "!node:*"
                ]
              }
            ]
          }
        ]
      }
    },
    {
      files: [
        "**/*.entry.ts",
        "**/*.test.ts",
        "**/*.test-d.ts",
        "**/tests/**/*.ts"
      ],
      parser: "@typescript-eslint/parser",
      rules: {
        "@typescript-eslint/no-restricted-imports": [
          "error", {
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
          }
        ]
      }
    },
    {
      files: [
        "**/renderer/markup/html/**/*.ts"
      ],
      parser: "@typescript-eslint/parser",
      rules: {
        "@typescript-eslint/no-restricted-imports": [
          "error", {
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
          }
        ]
      }
    },
    {
      files: [
        "**/renderer/markup/markdown/**/*.ts"
      ],
      parser: "@typescript-eslint/parser",
      rules: {
        "@typescript-eslint/no-restricted-imports": [
          "error", {
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
          }
        ]
      }
    }
  ],
  plugins: ["sort-exports"]
};
