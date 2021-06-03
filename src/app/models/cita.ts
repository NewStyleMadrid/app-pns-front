import { NuevoUsuario } from 'src/app/models/nuevo-usuario';

export class Cita {

    tiposervicio: string;
    fecha: Date;
    usuario: NuevoUsuario;

    constructor(tiposervicio: string, fecha: Date, usuario: NuevoUsuario) {
        this.tiposervicio = tiposervicio;
        this.fecha = fecha;
        this.usuario = usuario;
    }
}
