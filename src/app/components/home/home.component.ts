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
      desc: ''
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

  //constructor(private tokenService: TokenService, private _config: NgbCarouselConfig) { };
  constructor(private tokenService: TokenService) { };

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      nombreUsuario: this.tokenService.getUserName(),
    };
  }
}
