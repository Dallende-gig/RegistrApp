// change-password.page.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/services/UserService/user-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  email: string | null;
  newPassword: string = ''; // Declarar la propiedad newPassword

  constructor(private route: ActivatedRoute, private userService: UserService,private router: Router,) {
    this.email = this.route.snapshot.paramMap.get('email');
    
  }

  changePassword() {
    this.userService.updateUserPassword(this.email!, this.newPassword);
    console.log("cambiada");
    this.navigateToHome();
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
