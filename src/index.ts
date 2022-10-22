import axios, { AxiosError } from 'axios';
import { LANGUAGE } from './languages'

export interface Config {
  NAVER_CLIENT_ID: string;
  NAVER_CLIENT_SECRET: string;
}

interface TranslateOptions {
  source?: LANGUAGE;
  target?: LANGUAGE;
  honorific?: boolean;
}

export class Papago {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  isConfigured() {
    if (!this.config) return false;
    if (!this.config.NAVER_CLIENT_ID) return false;
    if (!this.config.NAVER_CLIENT_SECRET) return false;
    return true;
  }

  async translate(text: string): Promise<string>;
  async translate(text: string, enko: boolean): Promise<string>;
  async translate(text: string, options: TranslateOptions): Promise<string>;
  async translate(text: string, options?: TranslateOptions | boolean) {
    if (this.config == null) {
      throw new Error('Papago instance should be initialized with config');
    }
    if (!this.config.NAVER_CLIENT_ID) {
      const error = new Error('NAVER_CLIENT_ID needs to be defined');
      (error as any).notConfigured = true;
      throw error;
    }
    if (!this.config.NAVER_CLIENT_SECRET) {
      const error = new Error('NAVER_CLIENT_SECRET needs to be defined');
      (error as any).notConfigured = true;
      throw error;
    }
    if (text == null) {
      throw new Error('Search term should be provided as lookup arguments');
    }

    let source: LANGUAGE | 'auto' = 'auto';
    let target: LANGUAGE = 'ko';
    let honorific = false;

    if (typeof options === 'boolean') {
      source = options ? 'en' : 'ko';
      target = options ? 'ko' : 'en';
    } else {
      source = options?.source ?? source;
      target = options?.target ?? target;
      honorific = options?.honorific ?? honorific;
    }

    const params = new URLSearchParams({
      source,
      target,
      text,
      honorific: honorific ? 'true' : 'false',
    });

    const config = {
      baseURL: 'https://openapi.naver.com/v1/',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-naver-client-id': this.config.NAVER_CLIENT_ID,
        'x-naver-client-secret': this.config.NAVER_CLIENT_SECRET,
      },
    };

    try {
      const response = await axios.post('papago/n2mt', params, config);
      return response.data.message.result.translatedText;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const newError = new Error(axiosError.response?.data.errorMessage) as any;
        newError.code = axiosError.response?.data.errorCode;
        newError.statusCode = axiosError.response?.status;
        newError.statusText = axiosError.response?.statusText;
        throw newError;
      } else {
        throw error;
      }
    }
  }
}

export default Papago;
export * from './languages';
