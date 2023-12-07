import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu-alumno/main-menu.component';
import { IonicModule } from '@ionic/angular';
import { AsignaturasComponent } from './Alumno/asignaturas/asignaturas.component';
import { MainMenuProfesorComponent } from './main-menu-profesor/main-menu-profesor.component';



@NgModule({
  declarations: [MainMenuComponent, MainMenuProfesorComponent,AsignaturasComponent],
  exports:[
    MainMenuComponent,
    MainMenuProfesorComponent,
    AsignaturasComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
