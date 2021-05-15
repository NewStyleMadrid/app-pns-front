import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Imagen } from 'src/app/models/diseño';
import { ImagenService } from 'src/app/service/imagen.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-listado-corte',
  templateUrl: './listado-corte.component.html',
  styleUrls: ['./listado-corte.component.css']
})
export class ListadoCorteComponent implements OnInit {

  estilos: Imagen[] = [];
  isAdmin = false;

  paginaActual:number= 0;

  totalPages: Array<number>;

  constructor(
    private imagenService: ImagenService, 
    private toastr: ToastrService, 
    private tokenService: TokenService,
    private modalService: NgbModal,
    ) { }

  ngOnInit() {
    this.cargarCortes();
    this.isAdmin = this.tokenService.isAdmin();
  }
  
  cargarCortes(): void {
    this.imagenService.listado().subscribe(data => {
      this.estilos = data;
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
        this.cargarCortes();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error al eliminar', {
          timeOut: 2000, positionClass: 'toast-top-center',
        });
      }
    );
  }
}
