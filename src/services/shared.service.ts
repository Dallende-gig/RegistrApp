import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private username: string | null = null;
  private title: string | null = null;

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string | null {
    return this.username;
  }

  setTitlePage(title: string){
    this.title = title;
  }

  getTitlePage(): string | null{
    return this.username;
  }
}
