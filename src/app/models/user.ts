export class User {
    id?: number;
    username: string;
    name: string;
    firstname: string;
    pwd: string;
    email: string;

    constructor(username: string, name: string, firstname: string, pwd: string, email: string) {
        this.username = username;
        this.name = name;
        this.firstname = firstname;
        this.pwd = pwd;
        this.email = email;
    }
}
