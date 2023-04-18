import { Component, OnInit } from '@angular/core';
import { Notyf } from 'notyf';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  existe_token: boolean = false;
  notyf = new Notyf();

  ngOnInit(): void {
    this.verificarToken();
  }

  // mensajes
  mostrarMensaje(mensaje: string) {
    this.notyf.success({
      message: mensaje,
      duration: 5000,
      position: {
        x: 'right',
        y: 'top',
      },
      ripple: true,
      background: '#00cc00',
      className: 'notyf-center',
      dismissible: false,
    });
  }

  verificarToken() {
    if (localStorage.getItem('token')) {
      this.existe_token = true;
    } else {
      this.existe_token = false;
    }
  }

  // cerrar sesion
  logout() {
    localStorage.removeItem('token');
    this.existe_token = false;
    this.mostrarMensaje('Sesión cerrada con éxito');
  }
}
