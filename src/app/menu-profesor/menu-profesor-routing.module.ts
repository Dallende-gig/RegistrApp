import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuProfesorPage } from './menu-profesor.page';
import { PerfilProfesorComponent } from './perfil-profesor/perfil-profesor.component';
import { AsignaturasImpartidasComponent } from './asignaturas-impartidas/asignaturas-impartidas.component';

const routes: Routes = [
  {
    path: '',
    component: MenuProfesorPage
  },
  {
    path:'perfil-profesor',
    component: PerfilProfesorComponent
  },
  {
    path: 'asignaturas-impartidas',
    component: AsignaturasImpartidasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuProfesorPageRoutingModule {}
