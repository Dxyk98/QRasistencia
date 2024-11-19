import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfesorHomePageRoutingModule } from './profesor-home-routing.module';
import { ProfesorHomePage } from './profesor-home.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorHomePageRoutingModule,
    QRCodeModule,
    ReactiveFormsModule,
  ],
  declarations: [ProfesorHomePage],
})
export class ProfesorHomePageModule {}
