import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneraQrPage } from './genera-qr.page';

describe('GeneraQrPage', () => {
  let component: GeneraQrPage;
  let fixture: ComponentFixture<GeneraQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneraQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
