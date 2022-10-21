# Papago

[![ISC-licensed](https://img.shields.io/github/license/pepebecker/papago.svg)](https://choosealicense.com/licenses/isc/)

## Install

```shell
npm install pepebecker/papago
```

## Usage

```ts
import Papago, { Config } from 'papago'

const config: Config = {
  NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET,
}

const papago = new Papago(config)

console.log(await papago.translate('what are you doing?'))
// 뭐하고 있어?

console.log(await papago.translate('what are you doing?', { honorific: true }))
// 뭐하고 있어요?

console.log(await papago.translate('뭐하고 있어요?', { source: 'ko', target: 'en' }))
// what are you doing?

console.log(await papago.translate('뭐하고 있어요?', { source: 'ko', target: 'ja' }))
// 何をしていますか？

console.log(await papago.translate('뭐하고 있어요?', { source: 'ko', target: 'es' }))
// ¿qué estás haciendo?
```

## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/pepebecker/papago/issues).
