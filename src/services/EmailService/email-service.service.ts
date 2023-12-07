import { Injectable } from '@angular/core';
import * as emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly YOUR_EMAILJS_API_KEY = 'mwJ6wgmSPKxP9ynbz';
  private readonly YOUR_EMAILJS_SERVICE_ID = 'service_vsj1rze'; // Verifica y actualiza esto
  private readonly YOUR_EMAILJS_TEMPLATE_ID = 'template_xahbfn5';

  constructor() {
    emailjs.init(this.YOUR_EMAILJS_API_KEY);
  }

  sendResetEmail(to: string, username: string, resetLink: string): Promise<any> {
    const templateParams = {
      to_email: to,
      username,
      reset_link: resetLink
    };

    return emailjs.send(this.YOUR_EMAILJS_SERVICE_ID, this.YOUR_EMAILJS_TEMPLATE_ID, templateParams);
  }
}