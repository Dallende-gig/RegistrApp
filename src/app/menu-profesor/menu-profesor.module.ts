import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuProfesorPageRoutingModule } from './menu-profesor-routing.module';

import { MenuProfesorPage } from './menu-profesor.page';
import { MainMenuComponent } from 'src/components/main-menu/main-menu.component';
import { ComponentsModule } from 'src/components/components.module.ts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuProfesorPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MenuProfesorPage]
})
export class MenuProfesorPageModule {}
