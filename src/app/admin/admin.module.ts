import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { NavsideComponent } from './pages/navside/navside.component';

@NgModule({
  declarations: [DashboardComponent, AgregarComponent, NavsideComponent],
  imports: [CommonModule, FormsModule, AdminRoutingModule],
})
export class AdminModule {}
