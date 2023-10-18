import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private alertController: AlertController,
  ) { }

  email: string = ''; 
  isValidEmail(email: string): boolean {
    // validacion del correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  //func reset password
  async resetPassword(email: string) {
    const user = this.userService.getUserByEmail(email);
  
    if (user) {
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
  
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
