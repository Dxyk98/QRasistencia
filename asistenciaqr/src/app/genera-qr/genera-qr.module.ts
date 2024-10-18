import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneraQrPageRoutingModule } from './genera-qr-routing.module';

import { GeneraQrPage } from './genera-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneraQrPageRoutingModule
  ],
  declarations: [GeneraQrPage]
})
export class GeneraQrPageModule {}
