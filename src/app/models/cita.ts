import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { Horas } from './horas';

export class Cita {

    tipoServicio: string;
    fecha: Date;
    usuario: NuevoUsuario;
    hora: Horas;

    constructor(tipoServicio: string, fecha: Date, hora: Horas, usuario: NuevoUsuario) {
        this.tipoServicio = tipoServicio;
        this.fecha = fecha;
        this.hora = hora;
        this.usuario = usuario;
    }
}
