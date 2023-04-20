import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AgregarComponent } from './pages/agregar/agregar.component';

@NgModule({
  declarations: [DashboardComponent, AgregarComponent],
  imports: [CommonModule, FormsModule, AdminRoutingModule, AdminRoutingModule],
})
export class AdminModule {}
