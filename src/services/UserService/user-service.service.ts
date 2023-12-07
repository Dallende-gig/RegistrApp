// userService.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = [
    { username: 'Diego', email: 'di.allende@duocuc.cl', password: '123456' },
    { username: 'Cam', email: 'al.grumi@duocuc.cl', password: '12345' },
    { username: 'Nicolas', email: 'ni@profesor.duoc.cl', password: '123456A' },
    { username: 'admin', email: 'registrapp4@gmail.com', password: '12212121'}
  ];

  findUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  updateUserPassword(email: string, newPassword: string) {
    const user = this.findUserByEmail(email);
    if (user) {
      user.password = newPassword;
    }
  }
}
