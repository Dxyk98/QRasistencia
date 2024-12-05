import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CalendarioPage } from './calendario.page';
import { AuthenticationService } from '../authentication.service';
import { StoreService } from '../store.service';
import { of } from 'rxjs';

describe('CalendarioPage', () => {
  let component: CalendarioPage;
  let fixture: ComponentFixture<CalendarioPage>;

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
            idAsistencia: '1',
            nombreUsuario: 'Juan Pérez',
            idClase: 'A101',
            horaAsistencia: '10:00 AM',
          },
        ])
      ),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarioPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AuthenticationService, useValue: mockAngularFireAuth },
        { provide: StoreService, useValue: mockAngularFirestore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load asistencia data from Firestore', () => {
    component.asistencia = [];
    fixture.detectChanges();

    const expectedData = [
      {
        idAsistencia: '1',
        nombreUsuario: 'Juan Pérez',
        idClase: 'A101',
        horaAsistencia: '10:00 AM',
      },
    ];

    expect(mockAngularFirestore.collection).toHaveBeenCalledWith('asistencia');
    expect(component.asistencia).toEqual(expectedData);
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
