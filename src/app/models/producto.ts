export class Producto {
    id?: number;
    nombre: string;
    precio: string;
    disponible: string;

    constructor(nombre: string, precio: string, disponible: string) {
        this.nombre = nombre;
        this.precio = precio;
        this.disponible= disponible;
    }
}
