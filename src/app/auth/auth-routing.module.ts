import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { ErrorPageComponent } from '../shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: IniciarSesionComponent },
      { path: 'signup', component: CrearCuentaComponent },
      { path: '**', component: ErrorPageComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
