import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private sqlite: SQLite
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Una vez que la plataforma esté lista, crea la base de datos y las tablas
      this.createDatabase();
    });
  }

  createDatabase() {
    this.sqlite.create({
      name: 'usuarios.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      // Crea la tabla de credenciales si no existe
      db.executeSql(`
        CREATE TABLE IF NOT EXISTS credenciales (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario TEXT,
          contrasena TEXT
        )`, [])
        .then(() => console.log('Tabla de credenciales creada'))
        .catch(error => console.error('Error al crear la tabla de credenciales', error));
    })
    .catch(error => console.error('Error al abrir la base de datos SQLite', error));
  }
}
