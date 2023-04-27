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

  // muestra un mensaje de error
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

  /**
  * Esta función crea un nuevo producto o actualiza uno existente con los datos y pantallas proporcionados
    mensajes de error si alguno de los campos obligatorios está vacío.
  */
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
      photo: '',
    };
    this.getProducts();
  }

  // Obtiene todos los productos
  getProducts() {
    this.adminService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.log(err),
    });
  }

  /**
  * Esta función elimina un producto y muestra un mensaje de éxito o error.
  * @param {string} _id - El parámetro "_id" es una cadena que representa el identificador único de un
   producto que necesita ser eliminado.
  */
  borrarProducto(_id: string) {
    this.adminService.deleteProduct(_id).subscribe({
      next: (response) => this.mostrarMensaje('Producto Borrado'),
      error: (err) => this.mostrarMensajeError('Error al borrar el producto'),
    });
    this.getProducts();
  }

  /**
   * La función "editarProducto" establece el indicador "editar" en verdadero y asigna los valores de un determinado producto
   * a"productCreate".
   * @param {any} producto - El parámetro "producto" es un objeto que representa un producto. Él
    contiene propiedades como "_id", "nombre", "fabricante", "descripcion", "precio" y "foto". El
    función "editarProducto" toma este objeto como entrada y establece los valores de las propiedades a la
    "producto"
   */
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
}
