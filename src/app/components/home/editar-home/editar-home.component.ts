import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Home } from 'src/app/models/home';
import { HomeService } from 'src/app/service/home.service';

@Component({
  selector: 'app-editar-home',
  templateUrl: './editar-home.component.html',
  styleUrls: ['./editar-home.component.css']
})
export class EditarHomeComponent implements OnInit {

  datos: Home = null;
  form: any = {};
  actualizado = false;
  failActualizado = false;
  msjErr = '';
  msjOK = '';
  failInit = false;

  constructor(
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.homeService.detalle(id).subscribe( data => {
      this.form.id=data.id;
      this.form.name = data.name;
    },
      (err: any) => {
        this.failInit = true;
        this.router.navigate(['/']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.homeService.actualizar(id, this.form).subscribe(
      data => {
        this.toastr.success('Imagen corte actualizada!', '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista-home']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error al actualizar imagen!', {
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
