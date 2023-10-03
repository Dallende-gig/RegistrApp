import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuProfesorPage } from './menu-profesor.page';

describe('MenuProfesorPage', () => {
  let component: MenuProfesorPage;
  let fixture: ComponentFixture<MenuProfesorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenuProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
