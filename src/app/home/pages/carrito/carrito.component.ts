import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Carrito } from 'src/app/interfaces/home/carrito.interface';
import { Notyf } from 'notyf';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  Productos: Carrito[] = [];
  Total: number = 0;
  notyf = new Notyf();

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getCart();
  }

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
  // mostrar mensaje de error
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

  /**
   Esta función recupera el carrito de compras del 
   usuario del servidor y calcula el precio total 
   de los productos en el carrito.
   */
  getCart() {
    const token: string | null = localStorage.getItem('token');

    if (token !== null) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.homeService.getShopCart(headers).subscribe({
        next: (data: Carrito[]) => {
          this.Productos = data;
          this.Productos.forEach((producto) => {
            this.Total += parseInt(producto.price);
          });
        },
        error: (err: any) => console.log(err),
      });
    }
  }

  /**
   * Esta función elimina un producto de un carrito de compras y actualiza el precio total de los products restantes
   * @param {string} _id - El parámetro `_id` es una cadena que representa el identificador único de un
   * producto en un carrito de compras. Se utiliza para identificar el producto que debe eliminarse en el carrito
   */
  deleteCart(_id: string) {
    console.log('Borrando', _id);
    this.homeService.deleteShopCart(_id).subscribe({
      next: (data) => {
        this.mostrarMensaje('El producto se borro del carrito');
        const index = this.Productos.findIndex(
          (producto) => producto._id === _id
        );
        this.Productos.splice(index, 1);

        this.Total = 0;
        this.Productos.forEach((producto) => {
          this.Total += parseInt(producto.price);
        });
      },
      error: (err) => console.log(err),
    });
  }

  /**
   * La función "comprar" comprueba si un usuario ha iniciado sesión y elimina todos los artículos de su carrito,
   * mostrando un mensaje de éxito y restableciendo el costo total si tiene éxito, o un mensaje de error si
   * el usuario no ha iniciado sesión.
   */
  comprar() {
    const token: string | null = localStorage.getItem('token');
    if (token !== null) {
      this.homeService.deleteAll().subscribe({
        next: (response) => {
          this.mostrarMensaje('Su compra se ha realizado con exito');
          this.getCart();
          this.Total = 0;
        },
        error: (err) => console.log(err),
      });
    } else {
      this.mostrarMensajeError(
        'Solo los usuarios registrados pueden hacer compras en nuestro sitio web.'
      );
      return;
    }
  }
}
