import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {

  usuarios: NuevoUsuario[] = [];
  isAdmin = false;
  paginaActual: number = 0;
  totalPages: Array<number>;
  roles: string[] = [];
  searchText;

  constructor(
    private usuarioService: AuthService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.isAdmin = this.tokenService.isAdmin();
  }

  cargarUsuarios(): void {
    this.usuarioService.lista().subscribe(data => {
      this.usuarios = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

  /**** Metodo para filtrar en la tabla ****/
  sortData(sort: Sort) {
    this.usuarioService.lista().subscribe(data => {
      const datos = data.slice();
      if (!sort.active || sort.direction === '') {
        this.usuarios = data;
      } else {
        this.usuarios = datos.sort((a, b) => {
          const aValue = (a as any)[sort.active];
          const bValue = (b as any)[sort.active];
          return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
        });
      }
    });
  }

  /* Fin del metodo de filtrado */

  borrar(id: number) {
    this.usuarioService.borrar(id).subscribe(
      data => {
        this.toastr.success('Usuario eliminado', ' ', {
          timeOut: 2000, positionClass: 'toast-top-center'
        });
        this.cargarUsuarios();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error al eliminar', {
          timeOut: 2000, positionClass: 'toast-top-center',
        });
      }
    );
  }
  /*
    abrirModal(modal: number): void {
      const modalRef = this.modalService.open(EditarProductoComponent);
      modalRef.componentInstance.index = modal;
    }
    */

}
