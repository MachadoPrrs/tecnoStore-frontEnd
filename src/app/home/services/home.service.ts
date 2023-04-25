import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private searchEndpoint: string = 'api/v1/search';

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

  getShopCart(headers: any): Observable<Carrito[]> {
    const url = `${this.apiURL}${this.shopCart}`;
    return this.http
      .get<Carritos>(url, { headers })
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

  searchProduct(termino: string): Observable<any> {
    const modelo = 'products';
    const url = `${this.apiURL}${this.searchEndpoint}/${modelo}/${termino}`;
    return this.http.get<any>(url).pipe(map((response) => response.results[0]));
  }
  // deleteAll(user: string): Observable<any> {
  //   const url = `${this.apiURL}${this.shopCart}/deleteAll/${user}`;
  //   return this.http.delete<any>(url);
  // }

  deleteAll(): Observable<any> {
    const url = `${this.apiURL}${this.shopCart}/deleteAll`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    return this.http.delete<any>(url, { headers });
  }
}
