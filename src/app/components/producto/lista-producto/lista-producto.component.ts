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

  page = 0;
  size = 8;
  order = 'id';
  asc = true;

  isFirst = false;
  isLast = false;

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
      console.log(data);
    },
      (err: any) => {
        console.log(err);
      }
    );
  }
  /*
  cargarProductos() {
    this.productoService.productos(this.page, this.size, this.order, this.asc).subscribe(
      data => {
        this.productos = data.content;
        this.isFirst = data.first;
        this.isLast = data.last;
        this.totalPages = new Array(data.totalPages);
        //console.log(data);
      },
      err => {
        console.log(err.error);
      }
    );
  }

  sort(): void {
    this.asc = !this.asc;
    this.cargarProductos();
  }

  rewind(): void {
    if (!this.isFirst) {
      this.page--;
      this.cargarProductos();
    }
  }

  forward(): void {
    if (!this.isLast) {
      this.page++;
      this.cargarProductos();
    }
  }

  setPage(page: number): void {
    this.page = page;
    this.cargarProductos();
  }

  setOrder(order: string): void {
    this.order = order;
    this.cargarProductos();
  }
  */
  borrar(id: number) {
    this.productoService.borrar(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', ' ', {
          timeOut: 2000, positionClass: 'toast-top-center'
        });
        this.cargarProductos();
      },
      err => {
        this.toastr.error(err.error.mensaje, ' ', {
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
