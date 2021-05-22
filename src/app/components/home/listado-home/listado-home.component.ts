import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Home } from 'src/app/models/home';
import { HomeService } from 'src/app/service/home.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-listado-home',
  templateUrl: './listado-home.component.html',
  styleUrls: ['./listado-home.component.css']
})

export class ListadoHomeComponent implements OnInit {

  homes: Home[] = [];
  estilos: Home
  isAdmin = false;

  paginaActual: number = 0;

  totalPages: Array<number>;

  constructor(
    private homeService: HomeService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.cargarImagenes();
    this.isAdmin = this.tokenService.isAdmin();
  }

  cargarImagenes(): void {
    this.homeService.listado().subscribe(data => {
      this.homes = data;
      //console.log(data);
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

  borrar(id: number) {
    this.homeService.delete(id).subscribe(
      data => {
        this.toastr.success('Imagen del home eliminada!', ' ', {
          timeOut: 2000, positionClass: 'toast-top-center'
        });
        this.cargarImagenes();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error al eliminar imagen!', {
          timeOut: 2000, positionClass: 'toast-top-center',
        });
      }
    );
  }
}
