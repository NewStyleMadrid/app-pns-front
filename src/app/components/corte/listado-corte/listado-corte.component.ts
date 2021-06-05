import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Corte } from 'src/app/models/corte';
import { CorteService } from 'src/app/service/corte.service';
import { TokenService } from 'src/app/service/token.service';
import { DetalleCorteComponent } from '../detalle-corte/detalle-corte.component';

@Component({
  selector: 'app-listado-corte',
  templateUrl: './listado-corte.component.html',
  styleUrls: ['./listado-corte.component.css']
})
export class ListadoCorteComponent implements OnInit {

  cortes: Corte[] = [];
  isAdmin = false;
  paginaActual: number = 0;
  totalPages: Array<number>;
  userName=false;

  constructor(
    private imagenService: CorteService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.cargarCortes();
    this.userName = this.tokenService.getUser();
    this.isAdmin = this.tokenService.isAdmin();
  }

  cargarCortes(): void {
    this.imagenService.listado().subscribe(data => {
      this.cortes = data;
      //console.log(data);
    },
      (err: any) => {
        //console.log(err);
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

  abrirModal(i: number) {
    const modalRef = this.modalService.open(DetalleCorteComponent);
    modalRef.componentInstance.index = i;
  }
}
