import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      { path: 'cuenta', loadChildren: () => import('../pages/cuenta/cuenta.module').then(m => m.CuentaPageModule) },
      { path: 'perfil', loadChildren: () => import('../pages/perfil/perfil.module').then(m => m.PerfilPageModule) },
      { path: 'asignaturas', loadChildren: () => import('../pages/asignaturas/asignaturas.module').then(m => m.AsignaturasPageModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
