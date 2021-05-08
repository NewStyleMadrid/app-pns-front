export class Producto {
    id?: number;
    nombre: string;
    precio: string;

    constructor(nombre: string, precio: string) {
        this.nombre = nombre;
        this.precio = precio;
    }
}
