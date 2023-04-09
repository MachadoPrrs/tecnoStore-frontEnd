import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/home/product.interface';
import { HomeService } from '../../services/home.service';
import { Carrito } from 'src/app/interfaces/home/carrito.interface';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  Productos: Carrito[] = [];
  Total: number = 0;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.homeService.getShopCart().subscribe({
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
