export class User {
    id?: number;
    name: string;
    firstname: string;
    password: string;
    email: string;

    constructor(name: string, firstname: string, password: string, email: string) {
        this.name = name;
        this.firstname = firstname;
        this.password = password;
        this.email = email;
    }
}
