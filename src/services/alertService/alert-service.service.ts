import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor(private alertController: AlertController) { }

  async mostrarAlertaConOK(titulo: string, mensaje: string, okCallback: () => void) {
    const alert = await this.alertController.create({
      header: titulo,  // Utiliza el título personalizado
      message: mensaje, // Utiliza el mensaje personalizado
      buttons: [{
        text: 'OK',
        handler: () => {
          okCallback();
          // Llama a la funcion de callback proporcionada cuando se hace clic en "OK"
        }
      }]
    });
  
      await alert.present();
    }
}
