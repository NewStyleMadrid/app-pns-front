import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Imagen } from 'src/app/models/imagen';
import { ImagenService } from 'src/app/service/imagen.service';
import { TokenService } from 'src/app/service/token.service';
=======
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/service/token.service';

//import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
>>>>>>> 83b5c9de5ea65ba1a2866abe1db7326f327c3cfd

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {


  //Titulo
  title = 'Peluquería New Style';

  // Nivel de zoom de maps
  zoom: number = 8;

  // Latitud y Longitud de Madrid
  lat: number = 40.4167;
  lng: number = -3.70325;

  info: any = {};
  /*imagenes: any[] = [
    {
      name: 'Peluquería New Style',
      img: 'assets/pelu00.jpeg',
      desc: 'Bienvenidos a nuestra peluquería donde ofrecemos el mejor catalogo de cortes y promociones a nuestros clientes.'
    },
    {
      name: 'Peluquería New Style',
      img: 'assets/pelu03.jpg',
      desc: '(+34) 910-045-401'
    }
  ];*/

<<<<<<< HEAD
  //Title
  title = 'My first AGM project';

   // google maps zoom level
   zoom: number = 8;

   // initial center position for the map
   lat: number = 51.673858;
   lng: number = 7.815982;

  /*
=======
  constructor(
    private tokenService: TokenService,
    private config: NgbCarouselConfig
  ) {
    config.interval = 3000;
    config.pauseOnHover = true;
  };

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      nombreUsuario: this.tokenService.getUserName(),
    };
  }

>>>>>>> 83b5c9de5ea65ba1a2866abe1db7326f327c3cfd
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
<<<<<<< HEAD
  */

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

  ngOnInit() {
    this.cargarImagen();
    this.isAdmin = this.tokenService.isAdmin();
    this.info = {
      token: this.tokenService.getToken(),
      nombreUsuario: this.tokenService.getUserName(),
    };
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
    const modalRef = this.modalService.open(HomeComponent);
    modalRef.componentInstance.index = modal;
  }
=======
>>>>>>> 83b5c9de5ea65ba1a2866abe1db7326f327c3cfd
}

// Interfaz para la seguridad.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

