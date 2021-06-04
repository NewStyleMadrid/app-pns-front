import { NuevoUsuario } from 'src/app/models/nuevo-usuario';

export class Cita {

    tipoServicio: string;
    fecha: Date;
    usuario: NuevoUsuario;

    constructor(tipoServicio: string, fecha: Date, usuario: NuevoUsuario) {
        this.tipoServicio = tipoServicio;
        this.fecha = fecha;
        this.usuario = usuario;
    }
}
