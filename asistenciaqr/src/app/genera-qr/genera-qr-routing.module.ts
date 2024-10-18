import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneraQrPage } from './genera-qr.page';

const routes: Routes = [
  {
    path: '',
    component: GeneraQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneraQrPageRoutingModule {}
