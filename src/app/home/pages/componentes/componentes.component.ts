import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/home/product.interface';
import { HomeService } from '../../services/home.service';
import { Notyf } from 'notyf';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.css'],
})
export class ComponentesComponent implements OnInit {
  Productos: Product[] = [];
  notyf = new Notyf();

  constructor(private homeService: HomeService) {}

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
      console.log(user);
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

  getProducts() {
    this.homeService.getProducts().subscribe({
      next: (data) => (this.Productos = data),
      error: (err) => console.log(err),
    });
  }
}
