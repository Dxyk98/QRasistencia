import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AdministradorPageRoutingModule } from './administrador-routing.module';
import { AdministradorPage } from './administrador.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    AdministradorPageRoutingModule,
  ],
  declarations: [AdministradorPage],
})
export class AdministradorPageModule {}
