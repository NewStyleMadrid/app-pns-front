import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  form: any = {};
  actualizado = false;
  failActualizado = false;
  msjErr = '';
  msjOK = '';

  failInit = false;

  constructor(private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.productoService.detalle(id).subscribe( data => {
      this.form.nombre = data.nombre;
      this.form.precio = data.precio;
    },
      (err: any) => {
        this.failInit = true;
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.productoService.editar(this.form, id).subscribe(
      data => {
        this.toastr.success('Producto actualizado!', '', {
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

  volver(): void {
    window.history.back();
  }

}
