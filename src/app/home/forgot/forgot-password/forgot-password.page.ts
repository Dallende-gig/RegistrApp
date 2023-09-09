import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  email: string = ''; // Variable para almacenar el valor del campo de correo electrónico
  isValidEmail(email: string): boolean {
    // validacion del correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  resetPassword() {
    //codigo resetPassword
  } 

  ngOnInit() {
  }

  navigateToHome() {
    this.router.navigate(['/home']); // Navigate to the "Forgot" page
  }
}
