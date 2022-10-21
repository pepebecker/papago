import { LANGUAGE } from './languages';
export interface Config {
    NAVER_CLIENT_ID: string;
    NAVER_CLIENT_SECRET: string;
}
interface TranslateOptions {
    source?: LANGUAGE;
    target?: LANGUAGE;
    honorific?: boolean;
}
declare class Papago {
    config: Config;
    constructor(config: Config);
    isConfigured(): boolean;
    translate(text: string): Promise<string>;
    translate(text: string, enko: boolean): Promise<string>;
    translate(text: string, options: TranslateOptions): Promise<string>;
}
export default Papago;
