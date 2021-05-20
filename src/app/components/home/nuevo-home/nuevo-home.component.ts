import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomeService } from 'src/app/service/home.service';

@Component({
  selector: 'app-nuevo-home',
  templateUrl: './nuevo-home.component.html',
  styleUrls: ['./nuevo-home.component.css']
})
export class NuevoHomeComponent implements OnInit {

  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;

  imagen: File;
  imagenMin: File;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onFileChange(event) {
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }

  onUpload(): void {
    this.spinner.show();
    this.homeService.upload(this.imagen).subscribe(
      data => {
        this.spinner.hide();
        this.router.navigate(['/lista-home']);
      },
      err => {
        alert(err.error.mensaje);
        this.spinner.hide();
        this.reset();
      }
    );
  }

  reset(): void {
    this.imagen = null;
    this.imagenMin = null;
    this.imagenFile.nativeElement.value = '';
  }
}
