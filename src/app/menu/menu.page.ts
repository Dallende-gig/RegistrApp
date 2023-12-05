import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss'],
})

// Declaraciones para las opciones del menu //
export class MenuPage implements OnInit {


  constructor(
    private router: Router,
  ) {}

  //Obtencion de Nombre de usuario para mostrar en el mensaje de bienvenida //
  ngOnInit() {
  }


  // Funciones de navegacion de botones //

  marcarAsistencia(){
    this.router.navigate(['/asignaturas']);
  }


}

