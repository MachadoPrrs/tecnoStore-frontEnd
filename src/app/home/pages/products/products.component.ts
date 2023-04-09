import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/home/product.interface';
import { HomeService } from '../../services/home.service';
import { Notyf } from 'notyf';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
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

  // agregar a favorito
  agregarFavorito(item: any) {
    this.homeService.postShopCart(item).subscribe({
      next: (data: any) => this.mostrarMensaje('El producto agrego al carrito'),
    });
  }

  getProducts() {
    this.homeService.getProducts().subscribe({
      next: (data) => {
        this.Productos = data;
        console.log(this.Productos);
      },
      error: (err) => console.log(err),
    });
  }
}
