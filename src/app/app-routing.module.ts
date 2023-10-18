import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './menu/perfil/perfil.component';
import { MiCuentaComponent } from './menu/mi-cuenta/mi-cuenta.component';
import { AsignaturasComponent } from './menu/asignaturas/asignaturas.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GuardGuard } from './home/guard/guard.guard';

const routes: Routes = [
  // Pagina Login
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },

  // Pagina Menu-Alumno
  { path: 'menu', canActivate: [GuardGuard],loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule) },

  // Pagina Menu-Profesor
  { path: 'menu-profesor', canActivate: [GuardGuard], loadChildren: () => import('./menu-profesor/menu-profesor.module').then( m => m.MenuProfesorPageModule)
  },

  // Pagina Has olvidado tu contraseña
  { path: 'forgot-password',canActivate: [GuardGuard],loadChildren: () => import('./home/forgot/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },

  /* Componentes */
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [GuardGuard]
  },

  {
    path: 'cuenta',
    component: MiCuentaComponent,
    canActivate: [GuardGuard]
  },

  {
    path: 'asignaturas',
    component: AsignaturasComponent,
    canActivate: [GuardGuard]
  },
  
  /* Not Found */
  {
    path: 'not-found',
    component: NotFoundComponent, 
  },
  {
    path: '**', 
    redirectTo: 'not-found',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
