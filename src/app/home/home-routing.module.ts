import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ErrorPageComponent } from '../shared/error-page/error-page.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'productos', component: ProductsComponent },
      { path: 'buscar', component: BuscarComponent },
      { path: 'carrito', component: CarritoComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: ':id', component: ProductComponent },
      { path: '**', component: ErrorPageComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
