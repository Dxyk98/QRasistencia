import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearCuentaPage } from './crear-cuenta.page';
import { AuthenticationService } from '../authentication.service';
import { StoreService } from '../store.service';

describe('CrearCuentaPage', () => {
  let component: CrearCuentaPage;
  let fixture: ComponentFixture<CrearCuentaPage>;

  // Mock de AngularFireAuth
  const mockAngularFireAuth = {
    createUserWithEmailAndPassword: jasmine
      .createSpy('createUserWithEmailAndPassword')
      .and.returnValue(Promise.resolve({ user: { uid: 'testUserId' } })),
  };

  // Mock de AngularFirestore
  const mockAngularFirestore = {
    collection: jasmine.createSpy('collection').and.returnValue({
      add: jasmine.createSpy('add').and.returnValue(Promise.resolve()),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearCuentaPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        { provide: AuthenticationService, useValue: mockAngularFireAuth },
        { provide: StoreService, useValue: mockAngularFirestore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearCuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the personaForm with all controls', () => {
    expect(component.personaForm.contains('nombre')).toBeTruthy();
    expect(component.personaForm.contains('apellido')).toBeTruthy();
    expect(component.personaForm.contains('carrera')).toBeTruthy();
    expect(component.personaForm.contains('horario')).toBeTruthy();
    expect(component.personaForm.contains('tipoPersona')).toBeTruthy();
    expect(component.personaForm.contains('email')).toBeTruthy();
    expect(component.personaForm.contains('contrasena')).toBeTruthy();
  });

  it('should disable the submit button if the form is invalid', () => {
    component.personaForm.patchValue({
      nombre: '',
      apellido: '',
      carrera: '',
      horario: '',
      tipoPersona: '',
      email: '',
      contrasena: '',
    });
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector(
      'ion-button[type="submit"]'
    );
    expect(button.disabled).toBeTrue();
  });

  it('should enable the submit button if the form is valid', () => {
    component.personaForm.patchValue({
      nombre: 'Juan',
      apellido: 'Pérez',
      carrera: 'Ingeniería',
      horario: 'Mañana',
      tipoPersona: 'Estudiante',
      email: 'test@duocuc.cl',
      contrasena: '123456',
    });
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector(
      'ion-button[type="submit"]'
    );
    expect(button.disabled).toBeFalse();
  });

  it('should call guardarPersona and create a new user with Firebase', async () => {
    const spyGuardarPersona = spyOn(
      component,
      'guardarPersona'
    ).and.callThrough();
    component.personaForm.patchValue({
      nombre: 'Juan',
      apellido: 'Pérez',
      carrera: 'Ingeniería',
      horario: 'Mañana',
      tipoPersona: 'Estudiante',
      email: 'test@duocuc.cl',
      contrasena: '123456',
    });

    await component.guardarPersona();

    expect(spyGuardarPersona).toHaveBeenCalled();
    expect(
      mockAngularFireAuth.createUserWithEmailAndPassword
    ).toHaveBeenCalledWith('test@duocuc.cl', '123456');
    expect(mockAngularFirestore.collection).toHaveBeenCalledWith('usuarios');
    expect(
      mockAngularFirestore.collection('usuarios').add
    ).toHaveBeenCalledWith({
      nombre: 'Juan',
      apellido: 'Pérez',
      carrera: 'Ingeniería',
      horario: 'Mañana',
      tipoPersona: 'Estudiante',
      email: 'test@duocuc.cl',
    });
  });
});
