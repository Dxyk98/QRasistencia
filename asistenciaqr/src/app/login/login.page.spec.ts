import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  // Mock de AngularFireAuth
  const mockAngularFireAuth: any = {
    signInWithEmailAndPassword: jasmine
      .createSpy('signInWithEmailAndPassword')
      .and.returnValue(
        Promise.resolve({ user: { email: 'test@duocuc.cl', uid: '12345' } })
      ),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        ReactiveFormsModule,
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig), // Configuración de Firebase
      ],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        AuthenticationService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login page', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with email and password fields', () => {
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('should require email and password fields to be valid', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    emailControl?.setValue('');
    passwordControl?.setValue('');

    expect(emailControl?.valid).toBeFalse();
    expect(passwordControl?.valid).toBeFalse();

    emailControl?.setValue('test@duocuc.cl');
    passwordControl?.setValue('123456');

    expect(emailControl?.valid).toBeTrue();
    expect(passwordControl?.valid).toBeTrue();
  });

  it('should disable the submit button if the form is invalid', () => {
    component.loginForm.get('email')?.setValue('');
    component.loginForm.get('password')?.setValue('');
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector(
      'ion-button[type="submit"]'
    );
    expect(button.disabled).toBeTrue();
  });

  it('should enable the submit button if the form is valid', () => {
    component.loginForm.get('email')?.setValue('test@duocuc.cl');
    component.loginForm.get('password')?.setValue('123456');
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector(
      'ion-button[type="submit"]'
    );
    expect(button.disabled).toBeFalse();
  });

  it('should call onLogin when the form is submitted', () => {
    spyOn(component, 'onLogin');
    component.loginForm.get('email')?.setValue('test@duocuc.cl');
    component.loginForm.get('password')?.setValue('123456');
    fixture.detectChanges();

    const form = fixture.debugElement.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.onLogin).toHaveBeenCalled();
  });
});
