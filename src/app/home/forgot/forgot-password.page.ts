import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertServiceService } from 'src/services/alertService/alert-service.service';
import axios from 'axios';
import * as emailjs from 'emailjs-com';
import { EmailService } from 'src/services/EmailService/email-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(
    private router: Router,
    private alertController: AlertController,
    private alertService: AlertServiceService,
    private emailService: EmailService
  ) { }


  email: string = ''; 
  isValidEmail(email: string): boolean {
    // validacion del correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  //func reset password
  async resetPassword(email: string) {
    try{
      const apiKey = 'f6bb1a7bf37eac28cd3cf2f1c38c8f99cb687de9'; 
      const emailToVerify = email.toLowerCase(); 

      // Hacer una solicitud a la API de Hunter para verificar el correo
      const hunterResponse = await axios.get(`https://api.hunter.io/v2/email-verifier?email=${emailToVerify}&api_key=${apiKey}`);

      const verificationResult = hunterResponse.data.data;

      if (verificationResult.result === 'valid') {
        console.log(`El correo electrónico ${email} es válido.`);
      }

        const emailnew = email;
        const user = this.findUserByEmail(email);
  
        if (user) {
          this.sendResetEmail(email);
          this.showSuccessAlert();
        } else {
          this.showErrorAlert();
        }
    }  
    catch (error: any) {
      console.error('Error al validar el correo electrónico:', error);
    }
  }

  findUserByEmail(email: string) {
    const users = [
      { username: 'Diego', email: 'di.allende@duocuc.cl', password: '123456' },
      { username: 'Cam', email: 'al.grumi@duocuc.cl', password: '12345' },
      { username: 'Nicolas', email: 'ni@profesor.duoc.cl', password: '123456A' },
      { username: 'admin', email: 'registrapp4@gmail.com', password: '12212121'}
    ];
    return users.find((user) => user.email === email);
  }

  

  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Usuario encontrado',
      message: 'Se enviará un correo para restablecer la contraseña.',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navigateToHome();
        }
      }]
    });

    await alert.present();
  }

  async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Favor ponte en contacto con tu administrador.',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navigateToHome();
        }
      }]
    });

    await alert.present();
  }

  

  async sendResetEmail(email: string) {
    const user = this.findUserByEmail(email);
  
    if (user) {
      const toEmail = email;
      const username = user.username;
      const resetLink = 'https://tuaplicacion.com/reset-password'; // Generar un enlace único de reseteo
  
      try {
        const response = await this.emailService.sendResetEmail(toEmail, username, resetLink);
        console.log('Correo enviado a correo: ',toEmail);
        console.log('Correo de reseteo enviado con éxito', response);

      } catch (error) {
        console.error('Error al enviar el correo de reseteo', error);
      }
    } else {
      console.error('Usuario no encontrado para el correo electrónico proporcionado');
    }
  }
  
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

} 

