import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service'; // Reemplaza esto con la ruta correcta

interface Credenciales {
  [usuario: string]: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private credenciales: Credenciales = {
    diego: '12345',
    cam: '123456',
    admin: 'admin1234'
  };

  constructor(
    private router: Router,
    public toastController: ToastController,
    private sharedService: SharedService // Inyecta el SharedService
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
      const toast = await this.toastController.create({
        message: 'Los campos no pueden estar vacíos.',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    // Verifica si las credenciales coinciden con el diccionario
    if (this.credenciales.hasOwnProperty(usuario) && this.credenciales[usuario] === contrasena) {
      // Las credenciales son válidas, redirige a la página /menu
      this.sharedService.setUsername(usuario);
      this.router.navigate(['/menu']);
    } else {
      // Las credenciales son incorrectas, muestra un mensaje de error
      const toast = await this.toastController.create({
        message: 'Usuario o contraseña incorrectos.',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }
  }

  navigateToMenu() {
    this.router.navigate(['/menu']); // Navigate to the "Menu" page
  }
}
