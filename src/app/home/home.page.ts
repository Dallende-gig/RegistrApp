import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServiceGuardService } from '../../services/loginGuard/service-guard.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  segmentValue: string = 'profesor';
  constructor(
    private router: Router,
    public toastController: ToastController,
    private sharedService: SharedService,
    private sqlite: SQLite,
    private serviceGuard: ServiceGuardService
  ) {}

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async validarYLogin() {
    const usuario = (document.querySelector('input[name="User"]') as HTMLInputElement).value;
    const contrasena = (document.querySelector('input[name="Pass"]') as HTMLInputElement).value;

    if (!usuario || !contrasena) {
      this.mostrarMensaje('Los campos no pueden estar vacíos.');
      return;
    }

    this.sqlite.create({
      name: 'usuarios.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM credenciales WHERE usuario = ? AND contrasena = ?', [usuario, contrasena])
        .then(data => {
          if (data.rows.length > 0) {
            // Las credenciales son válidas, redirige a la página /menu
            this.sharedService.setUsername(usuario);
            if (this.segmentValue === 'profesor') {
              this.router.navigate(['/menu-profesor']);
            } else {
              this.router.navigate(['/menu']);
            }

            // Marcar que el usuario ha pasado por el login
            this.serviceGuard.setPassedLogin(true);
          } else {
            // Las credenciales son incorrectas, muestra un mensaje de error
            this.mostrarMensaje('Usuario o contraseña incorrectos.');
          }
        })
        .catch(error => {
          console.error('Error al ejecutar consulta en SQLite', error);
          this.mostrarMensaje('Error al verificar las credenciales.');
        });
    })
    .catch(error => {
      console.error('Error al abrir la base de datos SQLite', error);
      this.mostrarMensaje('Error al abrir la base de datos.');
    });
  }

  navigateToMenu() {
    this.router.navigate(['/menu']); // Navigate to the "Menu" page
  }

  navigateToForgot() {
    this.router.navigate(['/forgot-password']); // Navigate to the "Forgot" page
  }
}
