# ✅ 8. ESLint Setting

- 설치

```shell
yarn add -D @next/eslint-plugin-next @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb eslint-config-airbnb-typescript eslint-import-resolver-alias eslint-import-resolver-typescript eslint-plugin-cypress eslint-plugin-import eslint-plugin-jest eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-simple-import-sort eslint-plugin-testing-library eslint-plugin-unused-imports
```

- `.eslintrc.js` 설정

```javascript
module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    jest: true,
    worker: true,
  },
  ignorePatterns: [
    'node_modules/',
    '.pnp.cjs',
    '.pnp.loader.cjs',
    'public/',
    '.yarn/',
  ],
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@next/next/recommended',
  ],
  plugins: [
    'simple-import-sort',
    'unused-imports',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
      ],
      plugins: [
        '@typescript-eslint',
      ],
      rules: {
        '@typescript-eslint/no-use-before-define': 'off',
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    {
      files: ['src/hooks/**/**/*.test.ts?(x)'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
      },
    },
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react', 'plugin:jest/recommended'],
      rules: {
        'jest/no-identical-title': 'off',
        'react-hooks/rules-of-hooks': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['cypress/**/*.ts'],
      extends: ['plugin:cypress/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./cypress/tsconfig.json'],
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    'react/require-default-props': 'off',
    'import/order': 'off',
    'react/jsx-no-useless-fragment': ['error', {
      allowExpressions: true,
    }],
    '@next/next/no-html-link-for-pages': ['error', 'src/app/'],
    'simple-import-sort/imports': ['error', {
      groups: [
        ['^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)'], // Packages. `react` related packages come first.
        ['^react'],
        ['^next'],
        ['^@?\\w'],
        ['^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)'],
        ['^\\u0000'],
        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ['^.+\\.svg$'],
        ['^.+\\.s?css$'],
      ],
    }],
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['warn', {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_',
    }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'never',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
  },
};
```

- `scripts` 설정

```json
{
  "scripts": {
    "lint": "eslint 'src/**/*.{js,jsx,ts,tsx}' --fix"
  }
}
```

- `.gitignore` 설정

```gitignore
# eslint cache
.eslintcache
```
