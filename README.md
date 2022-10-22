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

console.log(await papago.translate('뭐하고 있어요?', { target: 'en' }))
// what are you doing?

console.log(await papago.translate('뭐하고 있어요?', { target: 'ja' }))
// 何してるんですか？

console.log(await papago.translate('뭐하고 있어요?', { target: 'ja', honorific: true }))
// 何をしていますか？

console.log(await papago.translate('뭐하고 있어요?', { target: 'es' }))
// ¿qué estás haciendo?
```

## Options

 Option      | Description
-------------|-------------
 `source`    | Source language (default `auto` for autodetect)
 `target`    | Target language (default `en` or `ko`, depending on `source`)
 `honorific` | Use honorific form (default `false`)

## Supported Languages

 Code    | Language
---------|-----------
 `ko`    | Korean
 `en`    | English
 `ja`    | Japanese
 `zh-CN` | Chinese (Simplified)
 `zh-TW` | Chinese (Traditional)
 `es`    | Spanish
 `fr`    | French
 `de`    | German
 `ru`    | Russian
 `pt`    | Portuguese
 `it`    | Italian
 `vi`    | Vietnamese
 `th`    | Thai
 `id`    | Indonesian
 `hi`    | Hindi

## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/pepebecker/papago/issues).
