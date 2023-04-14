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

### 🎯 2.2 zero install 적용

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
touch ./src/__mocks__/file.js
touch ./src/__mocks__/svg.js
```

```javascript
// ./src/__mocks__/file.js
module.exports = 'test-file-stub';
```

```javascript
// ./src/__mocks__/svg.js
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

## ✅ 5. Styled Components Setting

### 🎯 5.1 Install Styled Components

- install (beta 버전 설치 이유는 6버전부터 `next.js 13` 지원)

```shell
yarn add styled-components@beta styled-reset
```

- `next.config.js` setting

```javascript
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  compiler: {
    reactRemoveProperties: isProd && {
      properties: ['^data-test'],
    },
    removeConsole: isProd && {
      exclude: ['error'],
    },
    styledComponents: true,
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
};
```

### 🎯 5.2 Styled Components Next.js Setting

- add GlobalStyle

```typescript
// ./src/styles/GlobalStyle.tsx
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
```

- add defaultTheme

```typescript
// ./src/styles/defaultTheme.ts
const defaultTheme = {
    white: '#FFFFFF',
    black: '#000000',
};

export default defaultTheme;
```

- `styled-components.d.ts` setting

```tsx
// ./@types/styled-components.d.ts
import type { CSSProp } from 'styled-components';

import defaultTheme from '@/styles/defaultTheme';

type ThemeType = typeof defaultTheme;

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {

    }
}

declare module 'react' {
    interface DOMAttributes<T> {
        css?: CSSProp<T>;
    }
}
```

- add StyledComponents Registry

```tsx
// ./src/components/provider/StyledComponentsRegistry.tsx
'use client';

import { ReactElement, ReactNode, useState } from 'react';

import { useServerInsertedHTML } from 'next/navigation';

import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

function StyledComponentsRegistry({ children }: { children: ReactNode }): ReactElement {
    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
        const styles = styledComponentsStyleSheet.getStyleElement();
        styledComponentsStyleSheet.instance.clearTag();

        return <>{styles}</>;
    });

    if (typeof window !== 'undefined') {
        return <>{children}</>;
    }

    return (
        <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
            {children}
        </StyleSheetManager>
    );
}

export default StyledComponentsRegistry;
```

- add Style Provider

```tsx
// ./src/components/provider/StyleProvider.tsx
import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";

import defaultTheme from "@/styles/defaultTheme";
import GlobalStyle from "@/styles/GlobalStyle";

export default function StyleProvider({ children } : PropsWithChildren){
    return (
        <ThemeProvider theme={defaultTheme}>
            <Reset />
            <GlobalStyle />
            {children}
        </ThemeProvider>
    )
}
```

- add root Provider

```tsx
// ./src/components/provider/index.tsx
'use client';

import { PropsWithChildren } from "react";

import StyledComponentsRegistry from "./StyledComponentsRegistry";
import StyleProvider from "./StyleProvider";

export default function Provider({ children } : PropsWithChildren){
    return(
        <StyledComponentsRegistry>
            <StyleProvider>
                {children}
            </StyleProvider>
        </StyledComponentsRegistry>
    )
}
```

- next.js root layout setting(provider)

```tsx
// ./src/app/layout.tsx
import { ReactNode } from "react";
import Provider from "@/components/provider";

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
```

### 🎯 5.3 Styled Components Test Setting

- add Mock Theme

```tsx
// ./src/test/MockTheme.tsx
import { ThemeProvider } from "styled-components";
import { PropsWithChildren } from "react";

import defaultTheme from "@/styles/defaultTheme";

export default function MockTheme({ children } : PropsWithChildren){
    return (
        <ThemeProvider theme={defaultTheme}>
            {children}
        </ThemeProvider>
    )
}
```

- add test render function

```tsx
// ./src/test/testHelper.tsx
import {ReactNode} from "react";
import {render} from "@testing-library/react";

import MockTheme from "./MockTheme";

export function renderWithProviders(node: ReactNode){
    return render(
        <MockTheme>
            {node}
        </MockTheme>
    )
}
```
