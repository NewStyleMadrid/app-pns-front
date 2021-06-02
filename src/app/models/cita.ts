import { NuevoUsuario } from 'src/app/models/nuevo-usuario';

export class Cita {

    servicio: string;
    fecha: Date;
    usuario: NuevoUsuario;

    constructor(servicio: string, fecha: Date, usuario: NuevoUsuario) {
        this.servicio = servicio;
        this.fecha = fecha;
        this.usuario = usuario;
    }
}
