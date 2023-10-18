import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertServiceService } from 'src/services/alertService/alert-service.service';
import axios from 'axios';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(
    private router: Router,
    private alertController: AlertController,
    private alertService: AlertServiceService
  ) { }

  email: string = ''; 
  isValidEmail(email: string): boolean {
    // validacion del correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  //func reset password
  async resetPassword(email: string) {
    try {
      const response = await axios.get(`http://localhost:3000/api/forgotpassword/${email}`);
      if (response.data.exists) {
        this.alertService.mostrarAlertaConOK('Usuario encontrado',  'Mensaje personalizado para esta página',
          () => {
            this.navigateToHome(); // Llama a la función navigateToHome cuando se hace clic en "OK"
          }
        );
      } else {
        // El usuario no existe
        this.alertService.mostrarAlertaConOK( 'Error', 'Favor ponte en contacto con tu administrador.',
          () => {
            this.navigateToHome(); // Llama a la función navigateToHome cuando se hace clic en "OK"
          }
        );
      }
    } catch (error){
      console.error('Error al obtener datos del API:', error);
    }
  }
  
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
