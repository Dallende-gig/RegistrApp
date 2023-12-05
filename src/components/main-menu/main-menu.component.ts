import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { SharedService } from '../../services/shared.service';
import { ServiceGuardService } from 'src/services/loginGuard/service-guard.service';

interface MenuItem {
  label: string;
  icon: string;
  destination: string;
}

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})

export class MainMenuComponent implements OnInit {
  username: string | null = null;
  menuItems: MenuItem[] = [
    { label: 'Inicio', icon: 'Home', destination: 'menu' },
    { label: 'Cuenta', icon: 'person', destination: 'cuenta' },
    { label: 'Perfil', icon: 'person-circle', destination: 'perfil' },
    { label: 'Asignaturas', icon: 'book', destination: 'asignaturas' },
    { label: 'Cerrar Sesión', icon: 'exit', destination: 'Cerrar Sesion' }
  ];

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private menuController: MenuController,
    private serviceGuard: ServiceGuardService
  ) {}

  ngOnInit() {
    this.username = this.sharedService.getUsername();
  }

  irA(destino: string) {
    const rutasValidas = ['cuenta', 'perfil', 'asignaturas', 'menu', 'home'];

    if (rutasValidas.includes(destino)) {
      this.router.navigate([destino]);
    } 
  }

  cerrarMenu() {
    this.menuController.close();
  }

  onLogout() {
    this.serviceGuard.setOutLogin (); 
    this.sharedService.setUsername(''); 
    this.menuController.close(); 
    this.router.navigate(['home']);
  }
}
