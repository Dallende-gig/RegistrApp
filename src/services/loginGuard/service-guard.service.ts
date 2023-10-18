import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceGuardService {
  private hasPassedLoginFlag = false;

  constructor() {}

  hasPassedLogin(): boolean {
    return this.hasPassedLoginFlag;
  }

  setPassedLogin(passed: boolean) {
    this.hasPassedLoginFlag = passed;
  }
}
