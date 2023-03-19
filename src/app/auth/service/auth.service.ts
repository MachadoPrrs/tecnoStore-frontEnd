import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // url de la API
  private apiUrl = 'https://tecnostore-backend-test-production.up.railway.app/';
  private signupEndPoint = 'api/v1/users/signup';
  private testUrl = 'http://localhost:3000/';
  private loginEndPorint = 'api/v1/users/login';

  crearCuenta(
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) {
    const req = { name, email, password, passwordConfirm };
    const url = `${this.testUrl}${this.signupEndPoint}`;

    return this.http.post(url, req);
  }

  iniciarSesion(email: string, password: string) {
    const req = { email, password };
    const url = `${this.testUrl}${this.loginEndPorint}`;

    return this.http.post(url, req);
  }
}
