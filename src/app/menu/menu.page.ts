import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { SharedService } from '../../services/shared.service';

interface MenuItem {
  label: string;
  icon: string;
  destination: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss'],
})
export class MenuPage implements OnInit {
  username: string | null = null;
  menuItems: MenuItem[] = [
    { label: 'Cuenta', icon: 'person', destination: 'cuenta' },
    { label: 'Perfil', icon: 'person-circle', destination: 'perfil' },
    { label: 'Asignaturas', icon: 'book', destination: 'asignaturas' },
    { label: 'Cerrar Sesión', icon: 'exit', destination: 'Cerrar Sesion' }
  ];

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private menuController: MenuController
  ) {}

  ngOnInit() {
    this.username = this.sharedService.getUsername();
  }

  irA(destino: string) {
    if (destino === 'cuenta' || destino === 'perfil') {
      this.router.navigate([`/menu/${destino}`]); // Ruta a través de "menu"
  } else {
    this.router.navigate([`/menu/${destino}`]); 
    }
  }

  cerrarMenu() {
    this.menuController.close();
  }
}
