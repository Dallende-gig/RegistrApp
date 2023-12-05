import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuProfesorPage } from './menu-profesor.page';
import { PerfilProfesorComponent } from '../../components/Profesor/perfil-profesor/perfil-profesor.component';
import { AsignaturasImpartidasComponent } from '../../components/Profesor/asignaturas-impartidas/asignaturas-impartidas.component';
import { ComponentsModule } from 'src/components/components.module.ts.module';

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
  imports: [RouterModule.forChild(routes),ComponentsModule],
  exports: [RouterModule],
})
export class MenuProfesorPageRoutingModule {}
