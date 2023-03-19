import { Component } from '@angular/core';
import { ISignup } from '../../interfaces/auth/signup.interface';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css'],
})
export class CrearCuentaComponent {
  constructor(private authSerive: AuthService) {}
  // usar la interfaz de signup
  user: ISignup = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  crearUsuario() {
    this.authSerive
      .crearCuenta(
        this.user.name,
        this.user.email,
        this.user.password,
        this.user.passwordConfirm
      )
      .subscribe({
        next: (data) => console.log(data),
        error: (err) => console.log(err),
      });
  }
}
