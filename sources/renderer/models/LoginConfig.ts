import ILoginConfig from "./ILoginConfig";

export default class LoginConfig implements ILoginConfig {
    host: string;
    username: string;
    password: string;

    constructor(host: string, username: string, password: string) {
        this.host = host;
        this.username = username;
        this.password = password;       
    }
}