import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Cita } from 'src/app/models/cita';
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

  constructor(
    private citaService: CitaService,
    private toastr: ToastrService,
    private tokenService: TokenService,
  ) { }

  ngOnInit() {
    this.cargarCitas();
    this.isAdmin = this.tokenService.isAdmin();
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
