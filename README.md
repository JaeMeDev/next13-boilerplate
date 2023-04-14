# 🐳 Next.js 13 Boilerplate

## ✅ 1. Next.js 13 Setting

```shell
npx create-next-app@latest .
```

## ✅ 2. Yarn Berry Setting

### 🎯 2.1 Install Yarn berry

- yarn berry 설치 및 `npm`관련 파일 제거

```shell
yarn set version berry

rm -rf node_modules
rm -rf package.lock.json
```

- TypeScript 설정 활성화. (VSCode일 경우 `base`가 아닌 `vscode`로 설정)

```shell
yarn dlx @yarnpkg/sdks base 
```

- `@types`로 시작하는 별도의 타입 정의를 설치하는 작업을 자동화 해주는 플러그인 설치

```shell
yarn plugin import typescript
```

```shell
yarn
```

### 🎯 2.2. zero install 적용

```text
# /.gitignore

.yarn/*
!.yarn/cache
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
```

### 🎯 2.3 next.js build 안되는 문제 해결

```shell
yarn unplug next
```

### ✅ 3. Typescript Config Setting

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true,
    "noFallthroughCasesInSwitch": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "baseUrl": ".",
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "src/**/*.ts", "src/**/*.tsx", "@types", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### ✅ 4. Jest + Testing-Library Setting

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
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/file.js',
        '^.+\\.(svg)$': '<rootDir>/src/__mocks__/svg.js',
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
touch src/@types/jest.d.ts
```

```typescript
declare const given: {
    <T = never>(key: string, callback: () => T): T;
    [key: string]: never;
};
```

- add file, svg default mock

```shell
touch ./src/__mocks__/file.js
touch ./src/__mocks__/svg.js
```

```javascript
// /src/__mocks__/file.js
module.exports = 'test-file-stub';
```

```javascript
// /src/__mocks__/svg.js
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
