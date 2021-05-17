import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quienessomos',
  templateUrl: './quienessomos.component.html',
  styleUrls: ['./quienessomos.component.css']
})
export class QuienessomosComponent implements OnInit {

   // Nivel de zoom de maps
   zoom: number = 15;

   // Latitud y Longitud de Madrid
   lat: number = 40.4167;
   lng: number = -3.70325;
 

  constructor() { }

  ngOnInit(): void {
  }

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

}

// Interfaz para la seguridad.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

