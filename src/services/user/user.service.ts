import { Injectable } from '@angular/core';

export interface User {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { username: 'Diego', email: 'di.allende@duocuc.cl', password: '123456' },
    { username: 'Cam', email: 'al.grumi@duocuc.cl', password: '12345' },
    { username: 'Nicolas', email: 'ni@profesor.duoc.cl', password: '123456A'},
    
  ];

  constructor() {}

  getUserByUsername(username: string): User | undefined {
    return this.users.find(user => user.username === username);
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }
}
