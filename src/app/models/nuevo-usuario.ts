export class NuevoUsuario {
    id?: number;
    nombre: string;
    apellidos: string;
    userName: string;
    email: string;
    roles: string[];
    password: string;

    constructor(nombre: string, apellidos: string, userName: string, email: string, password: string) {
        this.nombre = nombre;
        this.apellidos=apellidos;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.roles = ['user'];
    }
}
