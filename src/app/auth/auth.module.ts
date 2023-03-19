import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [CrearCuentaComponent, IniciarSesionComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule],
  providers: [],
})
export class AuthModule {}
