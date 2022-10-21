var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import qs from 'querystring';
export class Papago {
    constructor(config) {
        this.config = config;
    }
    isConfigured() {
        if (!this.config)
            return false;
        if (!this.config.NAVER_CLIENT_ID)
            return false;
        if (!this.config.NAVER_CLIENT_SECRET)
            return false;
        return true;
    }
    translate(text, options) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config == null) {
                throw new Error('Papago instance should be initialized with config');
            }
            if (!this.config.NAVER_CLIENT_ID) {
                const error = new Error('NAVER_CLIENT_ID needs to be defined');
                error.notConfigured = true;
                throw error;
            }
            if (!this.config.NAVER_CLIENT_SECRET) {
                const error = new Error('NAVER_CLIENT_SECRET needs to be defined');
                error.notConfigured = true;
                throw error;
            }
            if (text == null) {
                throw new Error('Search term should be provided as lookup arguments');
            }
            let source = 'en';
            let target = 'ko';
            let honorific = false;
            if (typeof options === 'boolean') {
                source = options ? 'en' : 'ko';
                target = options ? 'ko' : 'en';
            }
            else {
                source = (_a = options === null || options === void 0 ? void 0 : options.source) !== null && _a !== void 0 ? _a : source;
                target = (_b = options === null || options === void 0 ? void 0 : options.target) !== null && _b !== void 0 ? _b : target;
                honorific = (_c = options === null || options === void 0 ? void 0 : options.honorific) !== null && _c !== void 0 ? _c : honorific;
            }
            const params = qs.stringify({ source, target, text, honorific });
            const config = {
                baseURL: 'https://openapi.naver.com/v1/',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-naver-client-id': this.config.NAVER_CLIENT_ID,
                    'x-naver-client-secret': this.config.NAVER_CLIENT_SECRET,
                },
            };
            const response = yield axios.post('papago/n2mt', params, config);
            return response.data.message.result.translatedText;
        });
    }
}
export default Papago;
export * from './languages';
