import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISignup } from 'src/app/interfaces/auth/signup.interface';
import { IResponse } from '../../interfaces/auth/response.interface';
import { ILogin } from '../../interfaces/auth/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // url de la API
  private apiUrl: string =
    'https://tecnostore-backend-test-production.up.railway.app/';
  private signupEndPoint: string = 'api/v1/users/signup';
  private testUrl: string = 'http://localhost:3000/';
  private loginEndPorint: string = 'api/v1/users/login';

  crearCuenta(user: ISignup): Observable<IResponse> {
    const url = `${this.testUrl}${this.signupEndPoint}`;
    return this.http.post<IResponse>(url, user);
  }

  iniciarSesion(user: ILogin): Observable<IResponse> {
    const url = `${this.testUrl}${this.loginEndPorint}`;
    return this.http.post<IResponse>(url, user);
  }
}
