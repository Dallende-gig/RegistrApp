import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPage } from './menu.page';
import { MiCuentaComponent } from '../../components/Alumno/mi-cuenta/mi-cuenta.component';
import { AsignaturasComponent } from '../../components/Alumno/asignaturas/asignaturas.component';
import { PerfilComponent } from '../../components/Alumno/perfil/perfil.component';
import { ComponentsModule } from 'src/components/components.module.ts.module';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      { path: 'menu', loadChildren: () => import('../menu/menu.module').then(m => m.MenuPageModule) },
      { path: 'cuenta', component: MiCuentaComponent},
      { path: 'perfil', component: PerfilComponent},
      
    ]
  },
  { path: 'asignaturas', component: AsignaturasComponent},
  { 
    path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule) 
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes), ComponentsModule],
  exports: [RouterModule],
})

export class MenuPageRoutingModule {}
