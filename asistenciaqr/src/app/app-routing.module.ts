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
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentPageModule),
  },
  {
    path: 'calendario',
    loadChildren: () =>
      import('./calendario/calendario.module').then(
        (m) => m.CalendarioPageModule
      ),
  },
  {
    path: 'horario',
    loadChildren: () =>
      import('./horario/horario.module').then((m) => m.HorarioPageModule),
  },  {
    path: 'administrador',
    loadChildren: () => import('./administrador/administrador.module').then( m => m.AdministradorPageModule)
  },
  {
    path: 'crear-cuenta',
    loadChildren: () => import('./crear-cuenta/crear-cuenta.module').then( m => m.CrearCuentaPageModule)
  },
  {
    path: 'crear-clase',
    loadChildren: () => import('./crear-clase/crear-clase.module').then( m => m.CrearClasePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
