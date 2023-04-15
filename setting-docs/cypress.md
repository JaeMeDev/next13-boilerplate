# ✅ 10. Cypress Setting

- install

```shell
yarn add -D cypress start-server-and-test
```

- `package.json` scripts 수정

```json
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "cypress:pnp": "node ./scripts/cypress-pnp.cjs",
    "test:e2e": "start-server-and-test dev http://localhost:3000 cypress:run"
  }
}
```

- `yarn run cypress:open` 실행

```shell
yarn run cypress:open
```

- `tsconfig` 설정 변경

```json
{
  "exclude": ["node_modules", "cypress"]
}
```

- `/cypress/tsconfig.json` 파일 생성

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "node"]
  },
  "include": ["./**/*.ts"]
}
```

- 파일 생성 후 `cy` 파일의 확장자를 `js` 에서 `ts`로 변경해주자.

- `cypress.config.js` 파일 수정

```javascript
module.exports = {
    // set your project id: https://cloud.cypress.io/
    projectId: '발급 받은 프로젝트 ID',
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        // eslint-disable-next-line no-unused-vars
        setupNodeEvents(_on, _config) {
            // ...
        },
        baseUrl: 'http://localhost:3000',
    },
};
```

- `CYPRESS_PROJECT_ID`는 https://www.cypress.io/ 에서 확인할 수 있다.(프로젝트 생성 후 가이드 참조)


