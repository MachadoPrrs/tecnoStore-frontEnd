import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    ProductsComponent,
    ProductComponent,
    BuscarComponent,
    CarritoComponent,
  ],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
