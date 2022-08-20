import 'mocha'
import { assert, expect } from 'chai'

import Papago, { Config } from '../src/index'

assert(typeof process.env.NAVER_CLIENT_ID === 'string', 'NAVER_CLIENT_ID should be defined')
assert(typeof process.env.NAVER_CLIENT_SECRET === 'string', 'NAVER_CLIENT_SECRET should be defined')

const config: Config = {
  NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID || '',
  NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET || '',
}

describe('Translate', () => {
  const papago = new Papago(config)
    
  it('translate to English', async () => {
    const result = await papago.translate('안녕하세요')
    expect(result.toLowerCase()).equal('hello')
  })

  it('translate to Korean', async () => {
    const result = await papago.translate('hello', true)
    expect(result.toLowerCase()).equal('안녕')
  })
})