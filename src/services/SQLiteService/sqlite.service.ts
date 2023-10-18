import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { MensajeService } from '../mensajeService/mensaje.service';

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {

  constructor(
    private sqlite: SQLite,
    private mensajeService: MensajeService,) { }


  verificarCredenciales(usuario: string, contrasena: string): Promise<boolean> {
    return this.createDatabase().then((db: SQLiteObject) => {
      return db.executeSql('SELECT * FROM credenciales WHERE usuario = ? AND contrasena = ?', [usuario, contrasena])
        .then(data => {
          return data.rows.length > 0; // Devuelve true si las credenciales son válidas
        })
        .catch(error => {
          console.error('Error al ejecutar consulta en SQLite', error);
          this.mensajeService.mostrarMensaje('No se han encontrado coincidencias')
          return false; // Devuelve false en caso de error
        });
    })
    .catch(error => {
      console.error('Error al abrir la base de datos SQLite', error);
      this.mensajeService.mostrarMensaje('Ha ocurrido un error interno de la base de datos');
      return false; // Devuelve false en caso de error
    });
  }
  createDatabase() {
    return this.sqlite.create({
      name: 'usuarios.db',
      location: 'default'
    });
  }

  createTable() {
    return this.createDatabase().then((db: SQLiteObject) => {
      return db.executeSql(`
        CREATE TABLE IF NOT EXISTS credenciales (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario TEXT,
          contrasena TEXT
        )`, [])
        .then(() => {
          console.log('Tabla de credenciales creada');
          this.mensajeService.mostrarMensaje('Tabla creada')
        })
        // .catch(error => console.error('Error al crear la tabla de credenciales', error));
        .catch(error => this.mensajeService.mostrarMensaje('Tabla NO creada'));
    });
  }

  agregarCredencial(usuario: string, contrasena: string) {
    return this.createDatabase().then((db: SQLiteObject) => {
      return db.executeSql('INSERT INTO credenciales (usuario, contrasena) VALUES (?, ?)', [usuario, contrasena])
        .then(() => {
          console.log('Credencial agregada con éxito.');
          this.mensajeService.mostrarMensaje('Credenciales creadas')
        })
        // .catch(error => console.error('Error al agregar la credencial', error));
        .catch(error => this.mensajeService.mostrarMensaje('Error al crear las credenciales'));
    });
  }
}
