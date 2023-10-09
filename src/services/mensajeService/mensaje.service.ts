import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class MensajeService {
  constructor(private toastController: ToastController) {}

  async mostrarMensaje(mensaje: string, duration: number = 2000,position: 'top' | 'bottom' | 'middle' = 'top'
  ) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration,
      position,
    });
    toast.present();
  }
}
