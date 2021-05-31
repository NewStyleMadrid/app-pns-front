export class JwtModel {
    id ?: number;
    token: string
    
    constructor(token: string) {
        this.token = token;
    }
}
