import { Component, OnInit } from '@angular/core';
import { IProductCreate } from 'src/app/interfaces/admin/ICreateProduct.interface';
import { AdminService } from '../../services/admin.service';
import { Product } from 'src/app/interfaces/home/product.interface';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  products: Product[] = [];
  notyf = new Notyf();
  editar: boolean = false;
  productID: string = '';

  productCreate: IProductCreate = {
    name: '',
    fabricante: '',
    descripcion: '',
    price: '',
    // category: 'default',
    photo: '',
  };

  // mostrar mensaje de exito
  mostrarMensaje(mensaje: string) {
    this.notyf.success({
      message: mensaje,
      duration: 5000,
      position: {
        x: 'right',
        y: 'top',
      },
      ripple: true,
      background: '#00cc00',
      className: 'notyf-center',
      dismissible: false,
    });
  }

  mostrarMensajeError(mensaje: string) {
    this.notyf.error({
      message: mensaje,
      duration: 5000,
      position: {
        x: 'right',
        y: 'top',
      },
      ripple: true,
      background: '#FF0000',
      className: 'notyf-center',
      dismissible: false,
    });
  }

  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    this.getProducts();
  }

  createProduct() {
    if (
      this.productCreate.name.trim() === '' ||
      this.productCreate.fabricante.trim() === '' ||
      this.productCreate.descripcion.trim() === '' ||
      this.productCreate.price.trim() === '' ||
      this.productCreate.photo === null
    ) {
      this.mostrarMensajeError('Ningún campo puede ir vacio');
    } else if (this.editar) {
      this.adminService
        .updateProduct(this.productCreate, this.productID)
        .subscribe({
          next: (response) => {
            this.mostrarMensaje('Producto Actualizado');
            this.editar = false;
            // this.getProducts();
          },
          error: (err) => console.log(err),
        });
    } else {
      const formData = new FormData();
      formData.append('name', this.productCreate.name);
      formData.append('fabricante', this.productCreate.fabricante);
      formData.append('descripcion', this.productCreate.descripcion);
      formData.append('price', this.productCreate.price);
      formData.append('photo', this.productCreate.photo);

      this.adminService.createProduct(formData).subscribe({
        next: (response) => this.mostrarMensaje(`Producto guardado`),
        error: (err) => this.mostrarMensajeError('Error al crear el producto'),
      });
    }

    this.productCreate = {
      name: '',
      fabricante: '',
      descripcion: '',
      price: '',
      // category: 'default',
      photo: '',
    };
    this.getProducts();
  }

  // get all products
  getProducts() {
    this.adminService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.log(err),
    });
  }

  borrarProducto(_id: string) {
    this.adminService.deleteProduct(_id).subscribe({
      next: (response) => this.mostrarMensaje('Producto Borrado'),
      error: (err) => this.mostrarMensajeError('Error al borrar el producto'),
    });
    this.getProducts();
  }

  editarProducto(producto: any) {
    this.editar = true;
    this.productID = producto._id;
    this.productCreate = {
      name: producto.name,
      fabricante: producto.fabricante,
      descripcion: producto.descripcion,
      price: producto.price,
      photo: producto.photo,
    };
  }

  // this.adminService
  //   .updateProduct(this.productCreate, producto._id)
  //   .subscribe({
  //     next: (response) => this.mostrarMensaje('Producto Actualizado'),
  //     error: (err) => console.log(err),
  //   });
}
