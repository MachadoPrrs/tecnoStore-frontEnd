import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProductCreate } from 'src/app/interfaces/admin/ICreateProduct.interface';
import { Product, Products } from 'src/app/interfaces/home/product.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  private apiURL: string = 'http://localhost:3000/';
  private createProductEndPoint: string = 'api/v1/products/';
  private getProductEndPoint: string = 'api/v1/products/';

  // crea un producto
  createProduct(product: any): Observable<any> {
    const url = `${this.apiURL}${this.createProductEndPoint}`;
    return this.http.post<any>(url, product);
  }

  // obtiene todos los productos
  getProducts(): Observable<Product[]> {
    const url = `${this.apiURL}${this.getProductEndPoint}`;
    return this.http
      .get<Products>(url)
      .pipe(map((response) => response.data.products));
  }

  // borra un producto
  deleteProduct(_id: string): Observable<any> {
    const url = `${this.apiURL}${this.getProductEndPoint}/${_id}`;
    return this.http.delete<any>(url);
  }

  // actualiza un producto
  updateProduct(product: any, _id: string): Observable<any> {
    const url = `${this.apiURL}${this.getProductEndPoint}/${_id}`;
    return this.http.patch<any>(url, product);
  }
}
