import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/home/product.interface';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  Productos: Product[] = [];

  constructor(private homeService: HomeService) {}
  ngOnInit(): void {
    this.getProducts();
  }

  // agregar a favorito
  agregarFavorito(item: any) {
    console.log(item);
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
