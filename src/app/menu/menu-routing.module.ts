import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPage } from './menu.page';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      { path: 'menu', loadChildren: () => import('../menu/menu.module').then(m => m.MenuPageModule) },
      { path: 'cuenta', component: MiCuentaComponent},
      { path: 'perfil', component: AsignaturasComponent},
      { path: 'asignaturas', component: PerfilComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class MenuPageRoutingModule {}
