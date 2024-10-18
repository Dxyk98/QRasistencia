import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'recuperar',
    loadChildren: () =>
      import('./recuperar/recuperar.module').then((m) => m.RecuperarPageModule),
  },
  {
    path: 'profesor-home',
    loadChildren: () =>
      import('./profesor-home/profesor-home.module').then(
        (m) => m.ProfesorHomePageModule
      ),
  },
  {
    path: 'home-student',
    loadChildren: () =>
      import('./home-student/home-student.module').then(
        (m) => m.HomeStudentPageModule
      ),
  },  {
    path: 'genera-qr',
    loadChildren: () => import('./genera-qr/genera-qr.module').then( m => m.GeneraQrPageModule)
  },
  {
    path: 'scanqr',
    loadChildren: () => import('./scanqr/scanqr.module').then( m => m.ScanqrPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
