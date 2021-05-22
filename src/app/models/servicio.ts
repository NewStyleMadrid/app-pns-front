export class Servicio {
    id?: number;
    tipoServicio: string;
    precioMujer: string;
    precioHombre: string;
    precioNinio: string;
    precioAdulto: string;

    constructor(tipoServicio: string, precioMujer: string, precioHombre: string, precioNinio: string, precioAdulto: string) {
        this.tipoServicio = tipoServicio;
        this.precioMujer = precioMujer;
        this.precioHombre = precioHombre;
        this.precioNinio = precioNinio;
        this.precioAdulto = precioAdulto;
    }
}
