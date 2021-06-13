import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  styleUrls: ['./nuevo-servicio.component.css']
})
export class NuevoServicioComponent implements OnInit {

  isCreate=false;
  noCreate=false;
  myForm: FormGroup;
  private servicio: any = {};
  private exPrecio: any = /^([0-9]{0,4})$/

  get tipoServicio() { return this.myForm.get('tipoServicio'); }
  get precioMujer() { return this.myForm.get('precioMujer'); }
  get precioHombre() { return this.myForm.get('precioHombre'); }
  get precioNinio() { return this.myForm.get('precioNinio'); }
  get precioAdulto() { return this.myForm.get('precioAdulto'); }

  constructor(
    private servicioService: ServicioService,
    private toastr: ToastrService,
    private router: Router) { this.myForm = this.createForm(); }

  ngOnInit() {

  }

  createForm() {
    return new FormGroup({
      tipoServicio: new FormControl('', [Validators.required,Validators.pattern('[a-zA-ZáéíóúüÁÉÍÓÚÜñÑÇ ]*')]),
      precioMujer: new FormControl('', [Validators.required]),
      precioHombre: new FormControl('', [Validators.required, Validators.pattern(this.exPrecio)]),
      precioNinio: new FormControl('', [Validators.required]),
      precioAdulto: new FormControl('', [Validators.required, Validators.pattern(this.exPrecio)])
    });
  }

  onCreate(): void {
    if (this.myForm.valid) {
      this.servicio = new Servicio(this.tipoServicio.value, this.precioMujer.value, this.precioHombre.value, this.precioNinio.value, this.precioAdulto.value);
      this.servicioService.crear(this.servicio).subscribe(
        data => {
          console.log(data);
          this.isCreate = true;
          this.noCreate = false;
          this.toastr.success('Servicio creado!', '', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['/lista-servicio']);
        },
        err => {
          this.toastr.error(err.error.mensaje, ' ', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          // this.router.navigate(['/']);
        }
      );
    }
  }

  volver(): void {
    this.router.navigate(['/']);
  }

}
