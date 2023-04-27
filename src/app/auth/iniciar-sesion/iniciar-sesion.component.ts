import { Component } from '@angular/core';
import { ILogin } from '../../interfaces/auth/login.interface';
import { AuthService } from '../service/auth.service';
import { IResponse } from '../../interfaces/auth/response.interface';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
})
export class IniciarSesionComponent {
  notyf = new Notyf();

  user: ILogin = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private ruta: Router) {}

  // funcion para validar email
  validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // mostrar mensajes de error
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
      dismissible: false,
    });
  }

  // enviar informacion a la API para poder hacer el login
  login() {
    // validar que los campos esten llenos
    if (!this.user.email || !this.user.password)
      return this.mostrarMensaje('Todos los campos tienen que estar llenos');

    // validar el email
    if (!this.validateEmail(this.user.email))
      return this.mostrarMensaje('El email no es valido');

    this.authService.iniciarSesion(this.user).subscribe({
      next: (data: IResponse) => {
        localStorage.setItem('token', data.token);
        if (data.verificarAdmin) {
          this.ruta.navigate(['/admin/agregar']);
        } else {
          this.ruta.navigate(['/home/productos']);
        }
      },
      error: () =>
        this.mostrarMensaje(
          'No se pudo iniciar sesión. Verifique sus credenciales.'
        ),
    });
  }
}
