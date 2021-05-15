import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Corte } from 'src/app/models/corte';
import { CorteService } from 'src/app/service/corte.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-listado-home',
  templateUrl: './listado-home.component.html',
  styleUrls: ['./listado-home.component.css']
})

export class ListadoHomeComponent implements OnInit {

  imagenes: Corte[] = [];
  estilos: Corte
  isAdmin = false;

  paginaActual:number= 0;

  totalPages: Array<number>;

  constructor(
    private imagenService: CorteService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private modalService: NgbModal,
    ) { }

  ngOnInit() {
    this.cargarImagenes();
    this.isAdmin = this.tokenService.isAdmin();
  }

  cargarImagenes(): void {
    this.imagenService.listado().subscribe(data => {
      this.imagenes = data;
      console.log(data);
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

  borrar(id: number) {
    this.imagenService.delete(id).subscribe(
      data => {
        this.toastr.success('Diseño Eliminado', ' ', {
          timeOut: 2000, positionClass: 'toast-top-center'
        });
        this.cargarImagenes();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error al eliminar', {
          timeOut: 2000, positionClass: 'toast-top-center',
        });
      }
    );
  }
}
