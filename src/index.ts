import axios from 'axios';
import qs from 'querystring';

export interface Config {
  NAVER_CLIENT_ID: string;
  NAVER_CLIENT_SECRET: string;
}

class Papago {
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

  async translate(term: string, enko = false) {
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
    if (term == null) {
      throw new Error('Search term should be provided as lookup arguments');
    }

    const params = qs.stringify({
      source: enko ? 'en' : 'ko',
      target: enko ? 'ko' : 'en',
      text: term,
    });

    const config = {
      baseURL: 'https://openapi.naver.com/v1/',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-naver-client-id': this.config.NAVER_CLIENT_ID,
        'x-naver-client-secret': this.config.NAVER_CLIENT_SECRET,
      },
    };

    const response = await axios.post('papago/n2mt', params, config);

    return response.data.message.result.translatedText;
  }
}

export default Papago;
