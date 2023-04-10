import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product, Products } from '../../interfaces/home/product.interface';
import { Carrito, Carritos } from 'src/app/interfaces/home/carrito.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  private apiURL: string = 'http://localhost:3000/';
  private getEndPoint: string = 'api/v1/products/';
  private shopCart: string = 'api/v1/carrito/';

  // Obtener todos los productos
  getProducts(): Observable<Product[]> {
    const url = `${this.apiURL}${this.getEndPoint}`;
    return this.http
      .get<Products>(url)
      .pipe(map((response) => response.data.products));
  }

  // Agregar productos al carrito
  postShopCart(cart: Product): any {
    const url = `${this.apiURL}${this.shopCart}`;
    return this.http.post<any>(url, cart);
  }

  // Obtener los productos del carrito
  getShopCart(): Observable<Carrito[]> {
    const url = `${this.apiURL}${this.shopCart}`;
    return this.http
      .get<Carritos>(url)
      .pipe(map((response) => response.data.carritos));
  }

  // Borrar productos del carrito
  deleteShopCart(_id: string): Observable<any> {
    const url = `${this.apiURL}${this.shopCart}/${_id}`;
    return this.http.delete<any>(url);
  }

  // Obtener un producto por id
  getProduct(_id: string | null): Observable<any> {
    const url = `${this.apiURL}${this.getEndPoint}/${_id}`;
    return this.http
      .get<any>(url)
      .pipe(map((response) => response.data.product));
  }
}
