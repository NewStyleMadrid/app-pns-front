import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
//import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  info: any = {};
  imgsHome: any[] = [
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
  ];

  //Title
  title = 'My first AGM project';

   // google maps zoom level
   zoom: number = 8;
  
   // initial center position for the map
   lat: number = 51.673858;
   lng: number = 7.815982;
 

  //constructor(private tokenService: TokenService, private _config: NgbCarouselConfig) { };
  constructor(
    private tokenService: TokenService
    ) { };
    
  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      nombreUsuario: this.tokenService.getUserName(),
    };
  }
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

