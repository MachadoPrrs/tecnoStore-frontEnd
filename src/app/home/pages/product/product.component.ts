import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { Product } from 'src/app/interfaces/home/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private homeService: HomeService
  ) {}
  // obtener el id por parametros del url
  id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
  // producto
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

  // cuando inicializa muestra el producto obtenido por id
  ngOnInit(): void {
    this.getProductById();
  }

  // obtiene un producto por id
  getProductById() {
    this.homeService.getProduct(this.id).subscribe({
      next: (data) => {
        this.product = Object.assign({}, data);
      },
    });
  }

  regresar() {
    this.router.navigate(['/home/productos']);
  }
}
