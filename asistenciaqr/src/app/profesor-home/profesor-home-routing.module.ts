import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorHomePage } from './profesor-home.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorHomePageRoutingModule {}
