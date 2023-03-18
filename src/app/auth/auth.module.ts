import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [CrearCuentaComponent, IniciarSesionComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
