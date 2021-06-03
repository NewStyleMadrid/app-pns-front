import { NuevoUsuario } from './../../../models/nuevo-usuario';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cita } from 'src/app/models/cita';
import { CitaService } from 'src/app/service/cita.service';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { ServicioService } from 'src/app/service/servicio.service';
import { Servicio } from 'src/app/models/servicio';


@Component({
  selector: 'app-nueva-cita',
  templateUrl: './nueva-cita.component.html',
  styleUrls: ['./nueva-cita.component.css'],

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

  //producto: Producto;
  isCreate = false;
  noCreate = false;
  creado = false;
  failCita = false;
  mensajeFail = '';
  mensajeOK = '';
  myForm: FormGroup;
  usuario: any;
  private cita: any = {};
  isLoginFail: boolean;
  errorMsg: any;
  userName = '';
  selectedValue: string;

  servicios:Servicio[];
  
  get servicio() { return this.myForm.get('servicio'); }
  get fecha() { return this.myForm.get('fecha'); }


  constructor(
    private authServcice: AuthService,
    private citaService: CitaService,
    private toastr: ToastrService,
    private servicioService: ServicioService, 
    private tokenService: TokenService,
    private router: Router) { this.myForm = this.createForm(); }

  ngOnInit() {
    /*
    this.authServcice.perfil(this.tokenService.getUserName()).subscribe(data => {
      console.log(this.usuario=data);
    });
    */
    console.log(this.cargarServicios());

  }

  createForm() {
    return new FormGroup({
      fecha: new FormControl('', [Validators.required]),
      servicio: new FormControl(),
    });
  }

  onCreate(): void {
    if (this.myForm.valid) {
      this.authServcice.perfil(this.tokenService.getUserName()).subscribe(data => {
        this.cita = new Cita(this.servicio.value, this.fecha.value, this.usuario = data);
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
              timeOut: 3000, positionClass: 'toast-top-center',
            });
            // this.router.navigate(['/']);
          });
      });
    }
  }

  // Servicio prueba
  cargarServicios() {
    this.servicioService.lista().subscribe(data => {
      console.log(data);
      this.servicios=data;
    });
  }

  closeLogin() {
    throw new Error('Method not implemented.');
  }

  volver(): void {
    window.history.back();
  }
}
/*
interface Hora {
  value: string;
  viewValue: string;

*/
