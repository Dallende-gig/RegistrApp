import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLiteService } from 'src/services/SQLiteService/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private sqliteService: SQLiteService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.sqliteService.createTable().then(() => {
        // Modificamos la lógica para agregar usuarios con sus respectivos niveles
        this.sqliteService.agregarCredencial('Cam', '12345', '2'); // Usuario de nivel 2 (alumno)
        this.sqliteService.agregarCredencial('Diego', '123456', '1'); // Usuario de nivel 1 (profesor)
        this.sqliteService.agregarCredencial('Nicolas', '1234567', '1'); // Usuario de nivel 1 (profesor)
      });
    });
  }
}
