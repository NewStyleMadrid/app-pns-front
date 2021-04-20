import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Imagen } from 'src/app/models/imagen';
import { ImagenService } from 'src/app/service/imagen.service';
import { TokenService } from 'src/app/service/token.service';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  imagenes: Imagen[] = [];
  isAdmin = false;
  logOut=false;
  paginaActual:number= 0;

  constructor(
    private imgService: ImagenService,
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
    const modalRef = this.modalService.open(DetalleComponent);
    modalRef.componentInstance.index = modal;
  }

}
