# ✅ 2. Yarn Berry Setting

## 🎯 2-1. Install Yarn berry

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

## 🎯 2-2. zero install 적용

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

## 🎯 2-3. next.js build 안되는 문제 해결

```shell
yarn unplug next
```
