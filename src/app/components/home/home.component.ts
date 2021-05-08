import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Imagen } from 'src/app/models/imagen';
import { ImagenService } from 'src/app/service/imagen.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  info: any = {};
  imgsHome: any[] = [
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
  ];

  constructor(
    private imgService: ImagenService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private tokenService: TokenService,
    private config: NgbCarouselConfig
  ) {
    config.interval = 3000;
    config.pauseOnHover = true;
  };

  //Titulo
  title = 'Peluquería New Style';

  // Nivel de zoom de maps
  zoom: number = 8;

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

   imagenes: Imagen[] = [];
   isAdmin = false;
   logOut=false;
   paginaActual:number= 0;



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
}

// Interfaz para la seguridad.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

