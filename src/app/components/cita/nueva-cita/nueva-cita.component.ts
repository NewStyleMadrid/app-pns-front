import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-nueva-cita',
  templateUrl: './nueva-cita.component.html',
  styleUrls: ['./nueva-cita.component.css']
})
export class NuevaCitaComponent implements OnInit {

  form: FormGroup;

  horas: Hora[] = [
    {value: '09:00', viewValue: '09:00'},
    {value: '09:45', viewValue: '09:45'},
    {value: '10:30', viewValue: '10:30'},
    {value: '11:15', viewValue: '11:15'},
    {value: '12:00', viewValue: '12:00'},
    {value: '12:45', viewValue: '12:45'},
    {value: '13:30', viewValue: '13:30'},
    {value: '14:15', viewValue: '14:15'},
  ];
 
  horaControl = new FormControl(this.horas[2].value);

  ngOnInit(): void {
  }

  constructor() {
    this.form = new FormGroup({
      hora: this.horaControl,
    });
  }
}
interface Hora {
  value: string;
  viewValue: string;
}

