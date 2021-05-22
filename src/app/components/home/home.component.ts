import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Home } from 'src/app/models/home';
import { Servicio } from 'src/app/models/servicio';
import { HomeService } from 'src/app/service/home.service';
import { ServicioService } from 'src/app/service/servicio.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  

  constructor(
    private homeService: HomeService,
    private spinner: NgxSpinnerService,
    private tokenService: TokenService,
    private config: NgbCarouselConfig,
    private servicioService: ServicioService
  ) {
    config.interval = 3000;
    config.pauseOnHover = true;
  }

  //Titulo
  title = 'Peluquería New Style';

  // Nivel de zoom de maps
  zoom: number = 15;

  // Latitud y Longitud de Madrid
  lat: number = 40.4167;
  lng: number = -3.70325;


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: 40.4167,
      lng: -3.70325,
      label: 'A',
      draggable: true
    }
    //Aqui podemos añadir más por si se extiende la franquicia
  ]

  homes: Home[] = [];
  isAdmin = false;
  paginaActual: number = 0;
  isLogged = false;
  info: any = {};
  servicios: Servicio[] = [];

  ngOnInit() {
    this.cargarImagen();
    this.cargarServicios();
    this.isLogged = this.tokenService.isLogged();
    this.info = {
      token: this.tokenService.getToken(),
      nombreUsuario: this.tokenService.getUserName(),
      
    };
  }

  cargarImagen(): void {
    this.spinner.show();
    this.homeService.lista().subscribe(data => {
      this.spinner.hide();
      this.isLogged = this.tokenService.isLogged();
      this.homes = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
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
}

// Interfaz para la seguridad.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

