import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { MensajeService } from '../mensajeService/mensaje.service';

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {

  constructor(
    private sqlite: SQLite,
    private mensajeService: MensajeService) { }

  verificarCredenciales(usuario: string, contrasena: string): Promise<string | null> {
    return this.createDatabase().then((db: SQLiteObject) => {
      return db.executeSql('SELECT * FROM credencial WHERE usuario = ? AND contrasena = ?', [usuario, contrasena])
        .then(data => {
          if (data.rows.length > 0) {
            const user = data.rows.item(0);
            // Supongamos que el nivel está almacenado en una columna llamada 'nivel'
            return user.nivel; // Devuelve el nivel del usuario
          }
          return null; // No se encontraron credenciales válidas
        })
        .catch(error => {
          console.error('Error al ejecutar consulta en SQLite', error);
          this.mensajeService.mostrarMensaje('No se han encontrado coincidencias');
          return null; // Error al ejecutar la consulta
        });
    })
    .catch(error => {
      console.error('Error al abrir la base de datos SQLite', error);
      this.mensajeService.mostrarMensaje('Ha ocurrido un error interno de la base de datos');
      return null; // Error al abrir la base de datos
    });
  }

  createDatabase() {
    return this.sqlite.create({
      name: 'Registr.db',
      location: 'default'
    });
  }

  createTable() {
    return this.createDatabase().then((db: SQLiteObject) => {
      return db.executeSql(`
        CREATE TABLE IF NOT EXISTS credencial (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario TEXT,
          contrasena TEXT,
          nivel TEXT
        )`, [])
        .then(() => {
          console.log('Tabla de credenciales creada');
          this.mensajeService.mostrarMensaje('Tabla creada')
        })
        .catch(error => this.mensajeService.mostrarMensaje('Tabla NO creada'));
    });
  }

  agregarCredencial(usuario: string, contrasena: string, nivel: string) {
    return this.createDatabase().then((db: SQLiteObject) => {
      return db.executeSql('INSERT INTO credencial (usuario, contrasena, nivel) VALUES (?, ?, ?)', [usuario, contrasena, nivel])
        .then(() => {
          console.log('Credencial agregada con éxito.');
          this.mensajeService.mostrarMensaje('Credenciales creadas')
        })
        .catch(error => this.mensajeService.mostrarMensaje('Error al crear las credenciales'));
    });
  }
}
