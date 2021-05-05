import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  /*imagenes: any[] = [
    {
      name: '',
      img: 'assets/pelu01.jpg',
      desc: 'sajnñfjnsfñsnkfFL'
    },
    {
      name: '',
      img: 'assets/pelu02.jpg',
      desc: ''
    },
    {
      name: '',
      img: 'assets/pelu03.jpg',
      desc: ''
    }
  ];*/

  //Title
  title = 'My first AGM project';

   // google maps zoom level
   zoom: number = 8;

   // initial center position for the map
   lat: number = 51.673858;
   lng: number = 7.815982;

  /*
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  }
  ]
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
}


// just an interface for type safety.
/*
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
*/

