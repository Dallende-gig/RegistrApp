import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SharedService } from '../../services/shared.service';
import { ServiceGuardService } from '../../services/loginGuard/service-guard.service';
import { MensajeService } from 'src/services/mensajeService/mensaje.service';
import { SQLiteService } from '../../services/SQLiteService/sqlite.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isMobile: boolean = false;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private serviceGuard: ServiceGuardService,
    private mensajeService: MensajeService,
    private sqliteService: SQLiteService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.isMobile = this.platform.is('mobile');
  }

  async validarYLogin() {
    const usuario = (document.querySelector('input[name="User"]') as HTMLInputElement).value;
    const contrasena = (document.querySelector('input[name="Pass"]') as HTMLInputElement).value;

    if (!usuario || !contrasena) {
      this.mensajeService.mostrarMensaje('Los campos no pueden estar vacíos.');
      return;
    }

    if (!this.isMobile) {
      // Credenciales estáticas para la versión web
      const validCredentials = [
        { username: 'Nicolas', password: '1234567', level: '1' },
        { username: 'Diego', password: '123456', level: '1' },
        { username: 'Cam', password: '12345', level: '2' },
      ];

      const isValid = validCredentials.some(
        (cred) => cred.username === usuario && cred.password === contrasena
      );

      if (isValid) {
        this.sharedService.setUsername(usuario);

        const user = validCredentials.find(cred => cred.username === usuario && cred.password === contrasena);
        if ( user?.level === '1') {
          // Acceder como profesor
          this.router.navigate(['/menu-profesor']);
          this.serviceGuard.setPassedLogin(true);
        } else if (user?.level === '2') {
          // Acceder como alumno
          this.router.navigate(['/menu']);
          this.serviceGuard.setPassedLogin(true);
        } else {
          this.mensajeService.mostrarMensaje('No tienes permisos para acceder a esta sección.');
        }
      } else {
        this.mensajeService.mostrarMensaje('Usuario o contraseña incorrectos.');
      }
    } else {
      this.sharedService.setUsername(usuario);
      // Lógica para el caso móvil usando SQLite

      this.sqliteService.verificarCredenciales(usuario, contrasena).then((level) => {
        if (level === '1' || level === '0') {
          this.router.navigate(['/menu-profesor']);
          this.serviceGuard.setPassedLogin(true);
        } else if (level === '2' || level === '0') {
          this.router.navigate(['/menu']);
          this.serviceGuard.setPassedLogin(true);
        } else {
          this.mensajeService.mostrarMensaje('No tienes permisos para acceder a esta sección.');
        }
      }).catch(() => {
        this.mensajeService.mostrarMensaje('Error al verificar credenciales.');
      });
    }
  }

  navigateToForgot() {
    this.router.navigate(['/forgot-password']);
  }
}
