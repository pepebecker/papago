export interface Config {
    NAVER_CLIENT_ID: string;
    NAVER_CLIENT_SECRET: string;
}
declare class Papago {
    config: Config;
    constructor(config: Config);
    isConfigured(): boolean;
    translate(term: string, enko?: boolean): Promise<any>;
}
export default Papago;
