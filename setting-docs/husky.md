# ✅ 9. Husky Setting

## 🎯 9-1. husky install

- install

```shell
yarn add -D husky
```

- script setting

```json
{
  "scripts": {
    "postinstall": "husky install && chmod ug+x .husky/*"
  }
}
```

- 실행

```shell
yarn run postinstall
```

## 🎯 9-2. lint-staged setting

- install

```shell
yarn add -D lint-staged
```

- `pre-commit` setting

```shell
yarn dlx husky add .husky/pre-commit
```

- `lintstagedrc.json` setting

```json
{
  "*.{js,jsx,ts,tsx}": [
    "yarn lint --cache",
    "yarn test:unit --findRelatedTests --passWithNoTests"
  ]
}
```

- `husky/pre-commit` setting

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn lint-staged
```

## 🎯 9-3. commitlint setting

- install

```shell
yarn add -D @commitlint/cli @commitlint/config-conventional
```

- `commit-msg` setting

```shell
yarn dlx husky add .husky/commit-msg
```

- `commitlint.config.js` setting

```javascript
module.exports = { extends: ['@commitlint/config-conventional'] };
```

- `husky/commit-msg` setting

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn commitlint --edit "$1"
```
