import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Cita } from 'src/app/models/cita';
import { AuthService } from 'src/app/service/auth.service';
import { CitaService } from 'src/app/service/cita.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-lista-cita',
  templateUrl: './lista-cita.component.html',
  styleUrls: ['./lista-cita.component.css']
})
export class ListaCitaComponent implements OnInit {

  citas: Cita[] = [];
  isAdmin = false;
  paginaActual: number = 0;
  totalPages: Array<number>;
  disableThirdHeader = false;

  constructor(
    private citaService: CitaService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private authServcice: AuthService
  ) { }

  ngOnInit() {
    console.log(this.cargarCitas());
    
  }

  cargarCitas(): void {
    this.citaService.lista().subscribe(data => {
      this.citas = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

  /**** Metodo para filtrar en la tabla ****/
  sortData(sort: Sort) {
    this.citaService.lista().subscribe(data => {
      const datos = data.slice();
      if (!sort.active || sort.direction === '') {
        this.citas = data;
      } else {
        this.citas = datos.sort((a, b) => {
          const aValue = (a as any)[sort.active];
          const bValue = (b as any)[sort.active];
          return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
        });
      }
    });
  }

  /* Fin del metodo de filtrado */

  borrar(id: number) {
    this.citaService.borrar(id).subscribe(
      data => {
        this.toastr.success('Cita Eliminado', ' ', {
          timeOut: 2000, positionClass: 'toast-top-center'
        });
        this.cargarCitas();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Erro al eliminar', {
          timeOut: 2000, positionClass: 'toast-top-center',
        });
      }
    );
  }
}
