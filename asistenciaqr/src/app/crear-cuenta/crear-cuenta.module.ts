import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearCuentaPageRoutingModule } from './crear-cuenta-routing.module';
import { CrearCuentaPage } from './crear-cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CrearCuentaPageRoutingModule
  ],
  declarations: [CrearCuentaPage]
})
export class CrearCuentaPageModule {}
