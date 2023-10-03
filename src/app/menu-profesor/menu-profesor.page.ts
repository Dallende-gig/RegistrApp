import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { SharedService } from '../../services/shared.service';
interface MenuItemProfesor {
  label: string;
  icon: string;
  destination: string;
}


@Component({
  selector: 'app-menu-profesor',
  templateUrl: './menu-profesor.page.html',
  styleUrls: ['./menu-profesor.page.scss'],
})
export class MenuProfesorPage implements OnInit {
  username: string | null = null;
  menuItems: MenuItemProfesor[] = [
    { label: 'Inicio', icon: 'Home', destination: 'menu-profesor' },
    { label: 'Perfil', icon: 'person-circle', destination: 'perfil-profesor' },
    { label: 'Asignaturas', icon: 'book', destination: 'asignaturas-impartidas' },
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
    const rutasValidas = ['perfil-profesor', 'asignaturas-impartidas', 'menu-profesor'];
    if (rutasValidas.includes(destino)) {
      this.router.navigate([destino]);
    } else {
      // Puedes redirigir a una página de error o realizar alguna otra acción aquí
      this.router.navigate(['not-found']);
    }
  }

  cerrarMenu() {
    this.menuController.close();
  }
}
