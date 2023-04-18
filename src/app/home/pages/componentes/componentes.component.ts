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

  product: Product = {
    _id: '',
    category: '',
    descripcion: '',
    fabricante: '',
    name: '',
    photo: '',
    price: '',
    ratingsAverage: 0,
  };

  hay_error: boolean = false;
  existe_termino: boolean = false;
  // buscador
  terminoBusqueda = {
    termino: '',
  };

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    if (!this.existe_termino) {
      this.getProducts();
    }
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

  // BUSCADOR
  buscar() {
    this.homeService.searchProduct(this.terminoBusqueda.termino).subscribe({
      next: (data) => {
        this.product = data;
        console.log(this.product); // Aquí se muestra el valor actualizado de this.product
      },
      error: (err) =>
        this.mostrarMensajeError(
          `No se encotró el producto ${this.terminoBusqueda.termino}`
        ),
    });
    this.existe_termino = true;
    this.terminoBusqueda = {
      termino: '',
    };
  }

  verProductos() {
    this.existe_termino = false;
    console.log(this.existe_termino);
  }
}
