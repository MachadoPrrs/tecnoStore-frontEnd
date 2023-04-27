import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent implements OnInit {
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

    var marker = new mapboxgl.Marker()
      .setLngLat([-82.97174072025, 8.8200044])
      .addTo(map);
  }
}
