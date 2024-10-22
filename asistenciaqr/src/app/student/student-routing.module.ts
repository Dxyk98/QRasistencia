import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentPage } from './student.page';

const routes: Routes = [
  {
    path: '',
    component: StudentPage,
    children: [
      {
        path: 'home-student',
        loadChildren: () =>
          import('./../home-student/home-student.module').then(
            (m) => m.HomeStudentPageModule
          ),
      },
      {
        path: 'calendario',
        loadChildren: () =>
          import('./../calendario/calendario.module').then(
            (m) => m.CalendarioPageModule
          ),
      },
      {
        path: 'horario',
        loadChildren: () =>
          import('./../horario/horario.module').then(
            (m) => m.HorarioPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPageRoutingModule {}
