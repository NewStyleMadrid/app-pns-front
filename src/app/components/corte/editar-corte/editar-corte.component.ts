import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Corte } from 'src/app/models/corte';
import { CorteService } from 'src/app/service/corte.service';

@Component({
  selector: 'app-editar-corte',
  templateUrl: './editar-corte.component.html',
  styleUrls: ['./editar-corte.component.css']
})
export class EditarCorteComponent implements OnInit {

  estilo: Corte = null;
  form: any = {};
  actualizado = false;
  failActualizado = false;
  msjErr = '';
  msjOK = '';
  failInit = false;

  constructor(
    private imagenService: CorteService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.imagenService.detalle(id).subscribe( data => {
      this.form.id=data.id;
      this.form.name = data.name;
    },
      (err: any) => {
        this.failInit = true;
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.imagenService.actualizar(id, this.form).subscribe(
      data => {
        this.toastr.success('Imagen actualizada!', '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista-diseños']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error al actualizar!', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

  volver(): void {
    window.history.back();
  }

}
