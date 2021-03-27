import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.css']
})
export class ListProductoComponent implements OnInit {

  productos: Producto[] = [];
  roles: string[];
  isAdmin = false;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.cargarProductos();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  cargarProductos(): void {
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: number) {
    this.productoService.eliminar(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarProductos();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }
}
