import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cita } from 'src/app/models/cita';
import { Horas } from 'src/app/models/horas';
import { Servicio } from 'src/app/models/servicio';
import { CitaService } from 'src/app/service/cita.service';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-editar-cita',
  templateUrl: './editar-cita.component.html',
  styleUrls: ['./editar-cita.component.css']
})
export class EditarCitaComponent implements OnInit {

  cita: Cita = null;
  form: any = {};
  actualizado = false;
  failActualizado = false;
  msjErr = '';
  msjOK = '';
  failInit = false;
  servicios:Servicio[]=[];
  horas : Horas[] = [0,1,2,3,4,5,6,7];

  constructor(
    private citaService: CitaService,
    private servicioService: ServicioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.cargarServicios();
    const id = this.activatedRoute.snapshot.params.id;
    this.citaService.detalle(id).subscribe( data => {
      this.form.tipoServicio = data.tipoServicio;
      this.form.hora = data.hora;
      this.form.fecha = data.fecha;
    },
      (err: any) => {
        this.failInit = true;
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.citaService.actualizar(id, this.form).subscribe(
      data => {
        this.toastr.success('Cita actualizada!', '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista-cita']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error al actualizar!', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

  // Metodo para obetener los servicios
  cargarServicios() {
    this.servicioService.lista().subscribe(data => {
      console.log(data);
      this.servicios=data;
    });
  }

  volver(): void {
    window.history.back();
  }


}
