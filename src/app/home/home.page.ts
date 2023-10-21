import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { ServiceGuardService } from '../../services/loginGuard/service-guard.service';
import { MensajeService } from 'src/services/mensajeService/mensaje.service';
import { SQLiteService } from '../../services/SQLiteService/sqlite.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  segmentValue: string = 'profesor';
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private serviceGuard: ServiceGuardService,
    private mensajeService: MensajeService,
    private sqliteService: SQLiteService
  ) {}


  async validarYLogin() {
    const usuario = (document.querySelector('input[name="User"]') as HTMLInputElement).value;
    const contrasena = (document.querySelector('input[name="Pass"]') as HTMLInputElement).value;

    if (!usuario || !contrasena) {
      this.mensajeService.mostrarMensaje('Los campos no pueden estar vacíos.');
      return;
    }

    this.sqliteService.verificarCredenciales(usuario, contrasena).then((valido) => {
      if (valido) {

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
        this.mensajeService.mostrarMensaje('Usuario o contraseña incorrectos.');
      }
    });
  }

  navigateToMenu() {
    this.router.navigate(['/menu']);
  }

  navigateToForgot() {
    this.router.navigate(['/forgot-password']);
  }
}
