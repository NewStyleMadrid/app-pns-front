import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  info: any = {};

<<<<<<< HEAD
  imgsHome:any[]=[
    {name:'',
    img:'assets/pelu03.jpg',
    desc:''},
=======
  imgsHome: any[] = [
>>>>>>> 2774767e55eb7758875ea838b7afa534ef20b869
    {
      name: 'Frozen 2',
      img: 'assets/pelu02.jpg',
      desc: 'Elsa, Anna, Kristoff and Olaf head far into the forest to learn the truth about an ancient mystery of their kingdom.'
    },
    {
      name: 'The Irishman',
      img: 'assets/pelu01.jpg',
      desc: 'Pennsylvania, 1956. Frank Sheeran, a war veteran of Irish origin who works as a truck driver, accidentally meets mobster Russell Bufalino. Once Frank becomes his trusted man, Bufalino sends him to Chicago with the task of helping Jimmy Hoffa, a powerful union leader related to organized crime, with whom Frank will maintain a close friendship for nearly twenty years.'
    },
    {
      name: 'The Irishman',
      img: 'assets/pelu01.jpg',
      desc: 'Pennsylvania, 1956. Frank Sheeran, a war veteran of Irish origin who works as a truck driver, accidentally meets mobster Russell Bufalino. Once Frank becomes his trusted man, Bufalino sends him to Chicago with the task of helping Jimmy Hoffa, a powerful union leader related to organized crime, with whom Frank will maintain a close friendship for nearly twenty years.'
    }
  ];

  constructor(private tokenService: TokenService, private _config: NgbCarouselConfig) { };

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      nombreUsuario: this.tokenService.getUserName(),
    };
  }
}
