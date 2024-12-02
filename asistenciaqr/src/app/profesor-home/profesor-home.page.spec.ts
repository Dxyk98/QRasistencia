import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesorHomePage } from './profesor-home.page';

describe('ProfesorHomePage', () => {
  let component: ProfesorHomePage;
  let fixture: ComponentFixture<ProfesorHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
