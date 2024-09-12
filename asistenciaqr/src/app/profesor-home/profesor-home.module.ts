import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesorHomePageRoutingModule } from './profesor-home-routing.module';

import { ProfesorHomePage } from './profesor-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorHomePageRoutingModule
  ],
  declarations: [ProfesorHomePage]
})
export class ProfesorHomePageModule {}
