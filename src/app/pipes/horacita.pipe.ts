import { Pipe, PipeTransform } from "@angular/core";
import { Horas } from "../models/horas";


@Pipe({name: 'horacita'})
export class HoraCitaPipe implements PipeTransform{
    viewHoras = [ '10:00', '11:00','12:00','13:00','16:00','17:00','18:00','19:00','20:00' ];
    transform(value: Horas):string {
        return this.viewHoras[value];
    }
}