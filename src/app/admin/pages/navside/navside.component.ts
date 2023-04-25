import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navside',
  templateUrl: './navside.component.html',
  styleUrls: ['./navside.component.css'],
})
export class NavsideComponent {
  constructor(private ruta: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.ruta.navigate(['home/productos']);
  }
}
