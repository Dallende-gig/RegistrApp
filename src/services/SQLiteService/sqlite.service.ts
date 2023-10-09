import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {

  constructor(private sqlite: SQLite) { }


  verificarCredenciales(usuario: string, contrasena: string): Promise<boolean> {
    return this.createDatabase().then((db: SQLiteObject) => {
      return db.executeSql('SELECT * FROM credenciales WHERE usuario = ? AND contrasena = ?', [usuario, contrasena])
        .then(data => {
          return data.rows.length > 0; // Devuelve true si las credenciales son válidas
        })
        .catch(error => {
          console.error('Error al ejecutar consulta en SQLite', error);
          return false; // Devuelve false en caso de error
        });
    })
    .catch(error => {
      console.error('Error al abrir la base de datos SQLite', error);
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
        })
        .catch(error => console.error('Error al crear la tabla de credenciales', error));
    });
  }

  agregarCredencial(usuario: string, contrasena: string) {
    return this.createDatabase().then((db: SQLiteObject) => {
      return db.executeSql('INSERT INTO credenciales (usuario, contrasena) VALUES (?, ?)', [usuario, contrasena])
        .then(() => {
          console.log('Credencial agregada con éxito.');
        })
        .catch(error => console.error('Error al agregar la credencial', error));
    });
  }
}
