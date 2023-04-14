# ✅ 4. Jest + Testing-Library Setting

- install
```shell
yarn add -D jest jest-environment-jsdom jest-plugin-context jest-styled-components @testing-library/jest-dom @testing-library/react given2 @types
```

- `jest.config.js` setting

```shell
touch jest.config.js
```

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
    setupFiles: [
        // add your setup files..
    ],
    setupFilesAfterEnv: [
        '<rootDir>/jest.setup.js',
    ],
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file.js',
        '^.+\\.(svg)$': '<rootDir>/__mocks__/svg.js',
    },
    testPathIgnorePatterns: [
        'node_modules',
        '<rootDir>.*/public',
        '<rootDir>/.next/',
    ],
    moduleDirectories: ['node_modules', '<rootDir>/'],
    testEnvironment: 'jest-environment-jsdom',
};

module.exports = async () => ({
    ...await createJestConfig(customJestConfig)(),
    transformIgnorePatterns: [
        // add your transform ignore patterns..
    ],
});
```

- `jest.setup.js` setting

```shell
touch jest.setup.js
```

```javascript
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import 'jest-plugin-context/setup';
import 'given2/setup';
```

- `given2` setting

```shell
touch @types/jest.d.ts
```

```typescript
declare const given: {
    <T = never>(key: string, callback: () => T): T;
    [key: string]: never;
};
```

- add file, svg default mock

```shell
touch __mocks__/file.js
touch __mocks__/svg.js
```

```javascript
// ./__mocks__/file.js
module.exports = 'test-file-stub';
```

```javascript
// ./__mocks__/svg.js
export default 'svg';

export const ReactComponent = 'div';
```

- add script
```json
{
  "scripts": {
    "test:unit": "jest",
    "test:watch": "jest --watch",
    "test:watchAll": "jest --watchAll",
    "test:coverage": "yarn test:unit --coverage",
    "test:watchAll:coverage": "jest --watchAll --coverage"
  }
}
```
