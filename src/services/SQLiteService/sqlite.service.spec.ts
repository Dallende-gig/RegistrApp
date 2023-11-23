import { TestBed } from '@angular/core/testing';
import { SQLiteService } from './sqlite.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Importa el módulo SQLite si es necesario

describe('SQLiteService', () => {
  let service: SQLiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SQLite,
        SQLiteService
      ]
    });
    service = TestBed.inject(SQLiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
