import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

 
  //producto: Producto;
  isCreate=false;
  noCreate=false;
  creado = false;
  failProducto = false;
  mensajeFail = '';
  mensajeOK = '';
  myForm: FormGroup;
  private producto: any = {};

  private exPrecio: any = /^([0-9]{0,4})$/

  get nombre() { return this.myForm.get('nombre'); }
  get precio() { return this.myForm.get('precio'); }


  constructor(
    private productoService: ProductoService, 
    private toastr: ToastrService, 
    private router: Router) { this.myForm = this.createForm(); }

  ngOnInit() {

  }

  createForm() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required,Validators.pattern(this.exPrecio)]),
    });
  }

  onCreate(): void {
    if (this.myForm.valid) {
    this.producto=new Producto(this.nombre.value,this.precio.value);
    this.productoService.crear(this.producto).subscribe(
      data => {
        this.isCreate = true;
        this.noCreate = false;
        this.toastr.success('Producto creado!', '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista-producto']);
      },
      err => {
        this.toastr.error(err.error.mensaje, ' ', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      }
    );
    }
  }

  volver(): void {
    window.history.back();
  }

}
