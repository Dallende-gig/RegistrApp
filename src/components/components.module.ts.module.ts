import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [MainMenuComponent],
  exports:[
    MainMenuComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
