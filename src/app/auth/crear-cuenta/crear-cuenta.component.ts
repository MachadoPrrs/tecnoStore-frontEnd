import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IResponse } from 'src/app/interfaces/auth/response.interface';
import { ISignup } from '../../interfaces/auth/signup.interface';
import { AuthService } from '../service/auth.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css'],
})
export class CrearCuentaComponent {
  notyf = new Notyf();

  constructor(private authSerive: AuthService, private ruta: Router) {}
  // usar la interfaz de signup
  user: ISignup = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  // funcion para validar email
  validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // mostrar mensaje de error
  mostrarMensaje(mensaje: string) {
    this.notyf.error({
      message: mensaje,
      duration: 5000,
      position: {
        x: 'center',
        y: 'center',
      },
      ripple: true,
      background: '#ff4444',
      className: 'notyf-center',
    });
  }
  // Crear usuario
  crearUsuario() {
    // validar que los campos no esten vacios
    if (!this.user.name || !this.user.password || !this.user.passwordConfirm)
      return this.mostrarMensaje('Todos los campos tienen que estar llenos');

    // validar el email
    if (!this.validateEmail(this.user.email))
      return this.mostrarMensaje('El email no es valido');

    // valdiar el password
    if (this.user.password !== this.user.passwordConfirm)
      return this.mostrarMensaje('Las contraseñas no coinciden');

    // validar la longitud del password
    if (this.user.password.length < 8)
      return this.mostrarMensaje(
        'La contraseña debe de tener 8 caracteres o más'
      );

    // mandar los datos a la API
    this.authSerive.crearCuenta(this.user).subscribe({
      next: (data: IResponse) => {
        localStorage.setItem('token', data.token);
        this.ruta.navigate(['/home/productos']);
      },
      error: (err) => this.mostrarMensaje('Algo salio mal, intenta de nuevo'),
    });
  }
}
