import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceGuardService } from '../../../services/loginGuard/service-guard.service';
import { MensajeService } from '../../../services/mensajeService/mensaje.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(
    private router: Router, 
    private serviceGuard: ServiceGuardService,
    private mensajeService: MensajeService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      
    if (this.serviceGuard.hasPassedLogin()) {
      return true;
    } else {
      this.mensajeService.mostrarMensaje('Debes realizar el login para acceder a esta pagina.')
      return this.router.parseUrl('/home');
    }
  }
}
