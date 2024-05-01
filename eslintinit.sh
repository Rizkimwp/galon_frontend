#!/bin/bash
# Array of packages to install
installation=(
  "eslint"
  "eslint-config-prettier"
  "eslint-plugin-prettier"
  "eslint-plugin-unused-imports"
  "@typescript-eslint/eslint-plugin"
  "@typescript-eslint/parser"
  "prettier"
  "typescript"
)

eslintrcContent=$(cat <<EOL
env:
  browser: true
  es2021: true

extends:
  - eslint:recommended
  - plugin:prettier/recommended
  - plugin:@typescript-eslint/recommended
  - prettier

overrides: []

parser: '@typescript-eslint/parser'

parserOptions:
  ecmaVersion: latest
  sourceType: module

plugins:
  - prettier
  - unused-imports
  - "@typescript-eslint"


rules:
  no-param-reassign: 0
  no-console: 0
  prefer-destructuring: 0
  no-shadow: 0
  radix: 0
  no-unused-vars: 0
  object-shorthand: 1
  prefer-template: 1
  no-empty-function: 0
  prettier/prettier:
    - 2
    - bracketSpacing: true
      printWidth: 140
      singleQuote: true
      trailingComma: es5
      tabWidth: 2
      useTabs: false
      endOfLine: auto
      semi: false

  unused-imports/no-unused-imports: warn
  unused-imports/no-unused-vars:
    - warn
    - vars: all
      varsIgnorePattern: '^_'
      args: after-used
      argsIgnorePattern: '^_'

  '@typescript-eslint/no-explicit-any': 0
  '@typescript-eslint/no-empty-function': 0
  '@typescript-eslint/explicit-module-boundary-types': off
  '@typescript-eslint/no-var-requires': 0
  '@typescript-eslint/no-namespace': off
  '@typescript-eslint/no-unused-vars': 0
  '@typescript-eslint/ban-types': 0
  '@typescript-eslint/ban-ts-comment': 0
EOL
)

eslintignoreContent=$(cat <<EOL
node_modules
dist
build
EOL
)

prettierrcContent=$(cat <<EOL
{
  "bracketSpacing": true,
  "printWidth": 140,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "useTabs": false,
  "endOfLine": "auto",
  "semi": false
}
EOL
)

prettierignoreContent=$(cat <<EOL
node_modules
dist
build
EOL
)

# Install packages
npm i --save-dev "${installation[@]}"

# Check for installation success
if [ $? -eq 0 ]; then
  echo "Instalation completed without errors."

  echo "$eslintrcContent" > "./.eslintrc.yml"
  echo "$eslintignoreContent" > "./.eslintignore"
  echo "$prettierrcContent" > "./.prettierrc"
  echo "$prettierignoreContent" > "./.prettierignore"


  echo "File $filePath successfully created and filled"
else
  echo "Error during installation."
fi