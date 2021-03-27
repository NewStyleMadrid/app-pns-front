export class RegistroUsuario {
    nombre: string;
    apellidos: string
    username:string;
    email:string;
    password:string;

    constructor(nombre:string,apellidos:string,username:string,email:string,password:string){
        this.nombre=nombre,
        this.apellidos=apellidos,
        this.username=username;
        this.email=email;
        this.password=password;
    }
}
