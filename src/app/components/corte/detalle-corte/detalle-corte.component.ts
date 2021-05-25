import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Corte } from 'src/app/models/corte';
import { CorteService } from 'src/app/service/corte.service';

@Component({
  selector: 'app-detalle-corte',
  templateUrl: './detalle-corte.component.html',
  styleUrls: ['./detalle-corte.component.css']
})
export class DetalleCorteComponent implements OnInit {

  @Input() index;


  cortes: Corte[] = [];

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: true
  };

  constructor(private activeModal: NgbActiveModal, private corteService: CorteService) { }

  ngOnInit(): void {
    this.corteService.lista().subscribe(data => {
      this.cortes = data;
    });
  }

  closeModal() {
    this.activeModal.dismiss();
  }

}
