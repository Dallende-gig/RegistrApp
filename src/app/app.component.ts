import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLiteService } from 'src/services/SQLiteService/sqlite.service';
import { retry } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private sqliteService: SQLiteService,
  ) {
    this.initializeApp();
  }

  
  initializeApp() {
    this.platform.ready().then(() => {
      this.sqliteService.createTable().then(() => {
      });
    });
    this.sqliteService.agregarCredencial('Cam','12345');
    this.sqliteService.agregarCredencial('Diego','123456');
    this.sqliteService.agregarCredencial('Nicolas','1234567');
    retry(2);
  }
}
