import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product, Products } from '../../interfaces/home/product.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  private apiURL = 'http://localhost:3000/';
  private getEndPoint = 'api/v1/products/';

  // getProducts(): Observable<Products[]> {
  //   const url = `${this.apiURL}${this.getEndPoint}`;
  //   return this.http.get<Products[]>(url);
  // }

  getProducts(): Observable<Product[]> {
    const url = `${this.apiURL}${this.getEndPoint}`;
    return this.http
      .get<Products>(url)
      .pipe(map((response) => response.data.products));
  }
}
