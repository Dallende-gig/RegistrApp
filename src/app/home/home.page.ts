import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service'; // Reemplaza esto con la ruta correcta

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private router: Router,
    private http: HttpClient,
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
  
    const apiUrl = 'http://192.168.1.88:3000/api/login';
  
    this.http.post(apiUrl, { usuario, contrasena }).subscribe(
      (response: any) => {
        if (response.message === 'Inicio de sesión exitoso') {
          this.mostrarMensaje('Credenciales Validas');
          this.sharedService.setUsername(usuario); // Almacena el nombre de usuario en SharedService
          this.router.navigate(['/menu']);
        } else {
          this.mostrarMensaje('Credenciales inválidas');
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        this.mostrarMensaje('Credenciales Invalidas');
      }
    );
  }

  navigateToMenu() {
    this.router.navigate(['/menu']); // Navigate to the "Menu" page
  }
}
