import { Component } from '@angular/core';
import { ILogin } from '../../interfaces/auth/login.interface';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
})
export class IniciarSesionComponent {
  user: ILogin = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

  login() {
    this.authService
      .iniciarSesion(this.user.email, this.user.password)
      .subscribe({
        next: (data) => console.log(data),
        error: (err) => console.log(err),
      });
  }
}
