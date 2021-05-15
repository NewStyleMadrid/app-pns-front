import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Corte } from 'src/app/models/corte';
import { CorteService } from 'src/app/service/corte.service';
import { TokenService } from 'src/app/service/token.service';
import { DetalleCorteComponent } from '../detalle-corte/detalle-corte.component';

@Component({
  selector: 'app-lista-corte',
  templateUrl: './lista-corte.component.html',
  styleUrls: ['./lista-corte.component.css']
})

export class ListaCorteComponent implements OnInit {

  imagenes: Corte[] = [];
  isAdmin = false;
  logOut=false;
  paginaActual:number= 0;

  constructor(
    private imgService: CorteService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private tokenService: TokenService
    ) { }
/*
  ngOnInit() {
   this.cargarImagenes();
  }
  cargarImagenes(): void {
    this.imgService.lista().subscribe(
      data => {
        this.imagenes = data;
      }
    );
  }*/

  ngOnInit() {
    this.cargarImagen();
    this.isAdmin = this.tokenService.isAdmin();
  }

  cargarImagen(): void {
    this.spinner.show();
    this.logOut=true;
    this.imgService.lista().subscribe(data => {
      this.spinner.hide();
      this.imagenes=data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

  borrar(id: number): void {
    this.spinner.show();
    this.imgService.delete(id).subscribe(
      data => {
        this.spinner.hide();
        this.cargarImagen();
      },
      err => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  abrirModal(modal: number): void {
    const modalRef = this.modalService.open(DetalleCorteComponent);
    modalRef.componentInstance.index = modal;
  }

}
