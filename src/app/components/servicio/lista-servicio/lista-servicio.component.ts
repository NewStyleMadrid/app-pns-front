import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/service/servicio.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-lista-servicio',
  templateUrl: './lista-servicio.component.html',
  styleUrls: ['./lista-servicio.component.css']
})
export class ListaServicioComponent implements OnInit {

  servicios: Servicio[] = [];
  isAdmin = false;

  paginaActual:number= 0;

  totalPages: Array<number>;

  constructor(
    private servicioService: ServicioService, 
    private toastr: ToastrService, 
    private tokenService: TokenService,
    private modalService: NgbModal,
    ) { }

  ngOnInit() {
    this.cargarServicios();
    this.isAdmin = this.tokenService.isAdmin();
  }
  
  cargarServicios(): void {
    this.servicioService.lista().subscribe(data => {
      this.servicios = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }
  
  borrar(id: number) {
    this.servicioService.borrar(id).subscribe(
      data => {
        this.toastr.success('Servicio Eliminado', ' ', {
          timeOut: 2000, positionClass: 'toast-top-center'
        });
        this.cargarServicios();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Erro al eliminar', {
          timeOut: 2000, positionClass: 'toast-top-center',
        });
      }
    );
  }

}
