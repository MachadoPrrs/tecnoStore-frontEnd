import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Notyf } from 'notyf';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent implements OnInit {
  notyf = new Notyf();
  contacto = {
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  };
  // Token de la api del mapa
  private tokenMapBox: string =
    'pk.eyJ1IjoiZGFya2NyZXkiLCJhIjoiY2xnYmIzM3BpMTF5aDNub3dhajg2OTY5ZiJ9.hNCeEmgaU0lm2McxcyA14Q';

  /*
   Aqui se llama la api del mapa
  */
  ngOnInit(): void {
    (mapboxgl as any).accessToken = this.tokenMapBox;
    const map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-82.97174072025, 8.8200044],
      zoom: 17,
    });

    let marker = new mapboxgl.Marker()
      .setLngLat([-82.97174072025, 8.8200044])
      .addTo(map);
  }

  // mostrar mensaje de exito
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

  // manejo del formulario del contacto
  enviarInformacion() {
    this.contacto = {
      nombre: '',
      email: '',
      telefono: '',
      mensaje: '',
    };
    this.mostrarMensaje('Mensaje enviado correctamente');
  }
}
