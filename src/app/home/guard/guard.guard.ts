import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceGuardService } from '../../../services/loginGuard/service-guard.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private router: Router, private serviceGuard: ServiceGuardService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    if (this.serviceGuard.hasPassedLogin()) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
