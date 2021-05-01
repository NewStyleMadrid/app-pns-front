import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { TokenService } from 'src/app/service/token.service';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  productos: Producto[] = [];
  isAdmin = false;

  paginaActual:number= 0;

  totalPages: Array<number>;

  constructor(
    private productoService: ProductoService, 
    private toastr: ToastrService, 
    private tokenService: TokenService,
    private modalService: NgbModal,
    ) { }

  ngOnInit() {
    this.cargarProductos();
    this.isAdmin = this.tokenService.isAdmin();
  }
  
  cargarProductos(): void {
    this.productoService.lista().subscribe(data => {
      this.productos = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }
  
  borrar(id: number) {
    this.productoService.borrar(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', ' ', {
          timeOut: 2000, positionClass: 'toast-top-center'
        });
        this.cargarProductos();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Erro al eliminar', {
          timeOut: 2000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  abrirModal(modal: number): void {
    const modalRef = this.modalService.open(EditarProductoComponent);
    modalRef.componentInstance.index = modal;
  }
}
