import { Home } from './../../../models/home';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenService } from 'src/app/service/token.service';
import { HomeService } from 'src/app/service/home.service';

@Component({
  selector: 'app-lista-home',
  templateUrl: './lista-home.component.html',
  styleUrls: ['./lista-home.component.css']
})

export class ListaHomeComponent implements OnInit {

  imagenes: Home[] = [];
  isAdmin = false;
  logOut=false;
  paginaActual:number= 0;

  constructor(
    private homeService: HomeService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private tokenService: TokenService
    ) { }

  ngOnInit() {
    this.cargarImagen();
    this.isAdmin = this.tokenService.isAdmin();
  }

  cargarImagen(): void {
    this.spinner.show();
    this.logOut=true;
    this.homeService.lista().subscribe(data => {
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
    this.homeService.delete(id).subscribe(
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

}
