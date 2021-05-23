import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cita } from 'src/app/models/cita';
import { CitaService } from 'src/app/service/cita.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Moment } from 'moment'; 

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },

  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};


@Component({
  selector: 'app-nueva-cita',
  templateUrl: './nueva-cita.component.html',
  styleUrls: ['./nueva-cita.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class NuevaCitaComponent implements OnInit {

  /*

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
*/

  isCreate = false;
  noCreate = false;
  creado = false;
  failCita = false;
  mensajeFail = '';
  mensajeOK = '';
  myForm: FormGroup;
  private cita: any = {};


  constructor(
    private citaService: CitaService,
    private toastr: ToastrService,
    private dateAdapter: DateAdapter<Date>,
    private router: Router) { this.myForm = this.createForm(); this.dateAdapter.setLocale('en-GB'); }

  get fecha() { return this.myForm.get('fecha') }


  ngOnInit() {

  }

  createForm() {
    return new FormGroup({
      fecha: new FormControl('', [Validators.required]),
    });
  }

  onCreate(): void {
    console.log(this.fecha.value);
    
    /*
    if (this.myForm.valid) {
    this.cita=new Cita(this.fecha.value);
    this.citaService.crear(this.cita).subscribe(
      data => {
        console.log(data);
        this.isCreate = true;
        this.noCreate = false;
        this.toastr.success('Cita creada!', '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista-cita']);
      },
      err => {
        this.toastr.error(err.error.mensaje, ' ', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      }
    );
    }*/
  }

  volver(): void {
    window.history.back();
  }
}

/*
interface Hora {
  value: string;
  viewValue: string;
}
*/
