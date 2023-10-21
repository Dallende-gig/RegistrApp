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
<<<<<<< HEAD
      const response = await axios.get(`http://192.168.1.114:3000/api/forgotpassword/${email}`);
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
=======
      const apiKey = 'f6bb1a7bf37eac28cd3cf2f1c38c8f99cb687de9'; 
      const emailToVerify = email.toLowerCase(); 

      // Hacer una solicitud a la API de Hunter para verificar el correo
      const hunterResponse = await axios.get(`https://api.hunter.io/v2/email-verifier?email=${emailToVerify}&api_key=${apiKey}`);

      const verificationResult = hunterResponse.data.data;

      if (verificationResult.result === 'valid') {
        console.log(`El correo electrónico ${email} es válido.`);
>>>>>>> f164312f60aee63b832be6ea52463b7494cdd9b5
      }
        // Ahora, compara el correo con los datos en tu JSON
        const users = [
          { username: 'Diego', email: 'di.allende@duocuc.cl', password: '123456' },
          { username: 'Cam', email: 'al.grumi@duocuc.cl', password: '12345' },
          { username: 'Nicolas', email: 'ni@profesor.duoc.cl', password: '123456A' }
        ];

        const matchingUser = users.find(user => user.email === emailToVerify);

        if (matchingUser) {
          const alert = await this.alertController.create({
            header: 'Usuario encontrado',
            message: 'Se enviará un correo para restablecer la contraseña.',
            buttons: [{
              text: 'OK',
              handler: () => {
                this.navigateToHome();  // Llama a navigateToHome cuando se hace clic en "OK"
              } 
            }]
          });
          await alert.present();
        } else {
          // El usuario no existe
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Favor ponte en contacto con tu administrador.',
            buttons: [{
              text: 'OK',
              handler: () => {
                this.navigateToHome();  // Llama a navigateToHome cuando se hace clic en "OK"
              }
            }]
          });
          await alert.present();
        }
      }
    catch (error) {
      console.error('Error al validar el correo electrónico:', error);
    }
  }
  
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
