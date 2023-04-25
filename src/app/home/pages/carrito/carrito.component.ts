import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/home/product.interface';
import { HomeService } from '../../services/home.service';
import { Carrito } from 'src/app/interfaces/home/carrito.interface';
import { Notyf } from 'notyf';
import { HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
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

  getCart() {
    const token: string | null = localStorage.getItem('token');

    if (token !== null) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      // const decoded: any = jwt_decode(token);
      // const user = decoded.id;
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

  deleteCart(_id: string) {
    console.log('Borrando', _id);
    this.homeService.deleteShopCart(_id).subscribe({
      next: (data) => {
        this.mostrarMensaje('El producto se borro del carrito');
        const index = this.Productos.findIndex(
          (producto) => producto._id === _id
        );
        this.Productos.splice(index, 1);
        // Actualizamos el total del carrito
        this.Total = 0;
        this.Productos.forEach((producto) => {
          this.Total += parseInt(producto.price);
        });
      },
      error: (err) => console.log(err),
    });
  }

  comprar() {
    const token: string | null = localStorage.getItem('token');
    if (token !== null) {
      // const decoded: any = jwt_decode(token);

      // const user = decoded.id;

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
