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
    
  it('translate to Korean', async () => {
    const result = await papago.translate('what are you doing?')
    expect(result.toLowerCase()).equal('뭐하고 있어?')
  })

  it('translate to Korean (enko)', async () => {
    const result = await papago.translate('what are you doing?', true)
    expect(result.toLowerCase()).equal('뭐하고 있어?')
  })

  it('translate to Korean (formal)', async () => {
    const result = await papago.translate('what are you doing?', { honorific: true })
    expect(result.toLowerCase()).equal('뭐하고 있어요?')
  })

  it('translate to Korean (informal)', async () => {
    const result = await papago.translate('what are you doing?', { source: 'en', target: 'ko' })
    expect(result.toLowerCase()).equal('뭐하고 있어?')
  })

  it('translate to English (enko)', async () => {
    const result = await papago.translate('뭐하고 있어요?', false)
    expect(result.toLowerCase()).equal('what are you doing?')
  })

  it('translate to Japanese (informal)', async () => {
    const result = await papago.translate('뭐하고 있어요?', { source: 'ko', target: 'ja' })
    expect(result.toLowerCase()).equal('何してるんですか？')
  })

  it('translate to Japanese (formal)', async () => {
    const result = await papago.translate('뭐하고 있어요?', { source: 'ko', target: 'ja', honorific: true })
    expect(result.toLowerCase()).equal('何をしていますか？')
  })

  it('translate to English (source, target)', async () => {
    const result = await papago.translate('뭐하고 있어요?', { source: 'ko', target: 'en' })
    expect(result.toLowerCase()).equal('what are you doing?')
  })

  it('translate to Chinese (simplified)', async () => {
    const result = await papago.translate('뭐하고 있어요?', { source: 'ko', target: 'zh-CN' })
    expect(result.toLowerCase()).equal('在干什么呢？')
  })

  it('translate to Chinese (traditional)', async () => {
    const result = await papago.translate('뭐하고 있어요?', { source: 'ko', target: 'zh-TW' })
    expect(result.toLowerCase()).equal('在幹什麼呢？')
  })

  it('translate to Spanish', async () => {
    const result = await papago.translate('뭐하고 있어요?', { source: 'ko', target: 'es' })
    expect(result.toLowerCase()).equal('¿qué estás haciendo?')
  })

  it('translate to German', async () => {
    const result = await papago.translate('뭐하고 있어요?', { source: 'ko', target: 'de' })
    expect(result.toLowerCase()).include('was machst du')
  })
})