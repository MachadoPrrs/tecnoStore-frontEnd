import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/home/product.interface';
import { HomeService } from '../../services/home.service';
import { Notyf } from 'notyf';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  Productos: Product[] = [];
  notyf = new Notyf();

  constructor(private homeService: HomeService) {}

  // cuando inicializa el componente llama los productos
  ngOnInit(): void {
    this.getProducts();
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

  // agregar a favorito
  agregarFavorito(item: any) {
    const token: string | null = localStorage.getItem('token');
    if (token !== null) {
      const decoded: any = jwt_decode(token);
      const user = decoded.id;
      // guarda el usuario en los items para referenciarlo en la base de datos
      const itemConUser = {
        ...item,
        user: user,
      };

      this.homeService.postShopCart(itemConUser).subscribe({
        next: (data: any) =>
          this.mostrarMensaje('El producto agrego al carrito'),
      });
    } else {
      this.mostrarMensajeError(
        'Solo los usuarios registrados pueden hacer compras en nuestro sitio web.'
      );
      return;
    }
  }

  // obtiene todos los productos
  getProducts() {
    this.homeService.getProducts().subscribe({
      next: (data) => (this.Productos = data),
      error: (err) => console.log(err),
    });
  }
}
