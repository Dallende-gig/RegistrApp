import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { IonicModule } from '@ionic/angular';
import { AsignaturasComponent } from './Alumno/asignaturas/asignaturas.component';



@NgModule({
  declarations: [MainMenuComponent, AsignaturasComponent],
  exports:[
    MainMenuComponent,
    AsignaturasComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
