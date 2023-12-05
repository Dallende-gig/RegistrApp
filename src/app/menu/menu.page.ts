import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss'],
})

// Declaraciones para las opciones del menu //
export class MenuPage implements OnInit {
  username: string | null = null;


  constructor(
    private router: Router,
    private sharedService: SharedService,
  ) {}

  //Obtencion de Nombre de usuario para mostrar en el mensaje de bienvenida //
  ngOnInit() {
    this.username = this.sharedService.getUsername();
  }


  // Funciones de navegacion de botones //

  marcarAsistencia(){
    this.router.navigate(['/asignaturas']);
  }


}

