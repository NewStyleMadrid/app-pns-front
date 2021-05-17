import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  producto: Producto = null;
  form: any = {};
  actualizado = false;
  failActualizado = false;
  msjErr = '';
  msjOK = '';
  failInit = false;

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.productoService.detalle(id).subscribe( data => {
      this.form.nombre = data.nombre;
      this.form.precio = data.precio;
      this.form.disponible = data.disponible;
    },
      (err: any) => {
        this.failInit = true;
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.productoService.actualizar(id, this.form).subscribe(
      data => {
        this.toastr.success('Producto actualizado!', '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista-productos']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error al actualizar!', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

  volver(): void {
    window.history.back();
  }

}
