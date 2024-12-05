import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomeStudentPage } from './home-student.page';
import { AuthenticationService } from '../authentication.service';
import { StoreService } from '../store.service';
import { of } from 'rxjs';

describe('HomeStudentPage', () => {
  let component: HomeStudentPage;
  let fixture: ComponentFixture<HomeStudentPage>;

  // Mock de AngularFireAuth
  const mockAngularFireAuth = {
    authState: of({ uid: 'testUserId' }),
  };

  // Mock de AngularFirestore
  const mockAngularFirestore = {
    collection: jasmine.createSpy('collection').and.returnValue({
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(
        of([
          {
            id: '1',
            nombre: 'Matemáticas',
            profesor: 'Juan Pérez',
            carreraClase: 'Ingeniería',
            horaInicio: '08:00',
            horaTermino: '09:30',
            dias: 'Lunes',
          },
        ])
      ),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeStudentPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AuthenticationService, useValue: mockAngularFireAuth },
        { provide: StoreService, useValue: mockAngularFirestore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close credential modal', () => {
    component.setCredentialOpen(true);
    fixture.detectChanges();
    expect(component.isModalCredential).toBeTrue();

    component.setCredentialOpen(false);
    fixture.detectChanges();
    expect(component.isModalCredential).toBeFalse();
  });

  it('should open and close scanner modal', () => {
    component.setScannerOpen(true);
    fixture.detectChanges();
    expect(component.isModalScanner).toBeTrue();

    component.setScannerOpen(false);
    fixture.detectChanges();
    expect(component.isModalScanner).toBeFalse();
  });

  it('should open and close settings modal', () => {
    component.setSettingsOpen(true);
    fixture.detectChanges();
    expect(component.isModalSettings).toBeTrue();

    component.setSettingsOpen(false);
    fixture.detectChanges();
    expect(component.isModalSettings).toBeFalse();
  });

  it('should display mobile content when isMobile is true', () => {
    component.isMobile = true;
    fixture.detectChanges();

    const mobileContent =
      fixture.debugElement.nativeElement.querySelector('.ion-page');
    expect(mobileContent).toBeTruthy();
  });

  it('should display desktop message when isMobile is false', () => {
    component.isMobile = false;
    fixture.detectChanges();

    const desktopMessage = fixture.debugElement.nativeElement.querySelector(
      '.desktop-message-container'
    );
    expect(desktopMessage).toBeTruthy();
  });
});
