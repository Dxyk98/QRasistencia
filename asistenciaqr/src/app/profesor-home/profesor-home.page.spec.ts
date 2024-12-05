import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StoreService } from '../store.service';
import { AuthenticationService } from '../authentication.service';
import { ProfesorHomePage } from './profesor-home.page';
import { of } from 'rxjs';

describe('ProfesorHomePage', () => {
  let component: ProfesorHomePage;
  let fixture: ComponentFixture<ProfesorHomePage>;

  // Mock de AngularFirestore
  const mockAngularFirestore = {
    collection: jasmine.createSpy('collection').and.returnValue({
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of([])),
    }),
  };

  // Mock de AngularFireAuth
  const mockAngularFireAuth = {
    authState: of(null),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfesorHomePage],
      imports: [IonicModule.forRoot(), CommonModule], // Asegura que CommonModule esté importado
      providers: [
        { provide: StoreService, useValue: mockAngularFirestore },
        { provide: AuthenticationService, useValue: mockAngularFireAuth },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesorHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the initial value of qrData as "Texto de base"', () => {
    expect(component.qrData).toBe('Texto de base');
  });

  // P9: Generación del código QR al pulsar un botón
  it('should generate QR code when generateQRCode() is called', () => {
    component.qrData = 'Prueba QR';
    component.generateQrCode(); // Método para generar el código QR
    expect(component.createdCode).toBe('Prueba QR'); // Verifica que createdCode se actualice
  });

  // P10: Verificar que el código QR no se muestra inicialmente
  it('should not render QR code initially', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('qrcode')).toBeNull(); // El elemento no debe estar presente
  });

  // P11: Actualización de createdCode al llamar a generateQRCode()
  it('should update createdCode when generateQRCode() is called with new data', () => {
    component.qrData = 'Nuevo texto QR';
    component.generateQrCode(); // Método para generar el código QR con datos nuevos
    expect(component.createdCode).toBe('Nuevo texto QR'); // Verifica que createdCode coincida con qrData
  });
});
