export class User {
    id?: number;
    nombre: string;
    username: string;
    apellidos: string;
    email: string;
    password: string;

    constructor(nombre: string, apellidos: string, username: string, email: string, password: string) {
        this.nombre=nombre;
        this.username=username;
        this.apellidos=apellidos;
        this.email = email;
        this.password = password;
    }
}
