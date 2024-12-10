import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { StoreService } from './store.service';
import { AuthenticationService } from './authentication.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';

describe('AppModule Providers', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule], // Importamos el AppModule completo
    }).compileComponents();
  });

  it('should create the AppModule successfully', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy(); // Verifica que el AppComponent se cree correctamente
  });

  it('should provide StoreService', () => {
    const service = TestBed.inject(StoreService);
    expect(service).toBeTruthy(); // Verifica que StoreService esté configurado y disponible
  });

  it('should provide AuthenticationService', () => {
    const service = TestBed.inject(AuthenticationService);
    expect(service).toBeTruthy(); // Verifica que AuthenticationService esté configurado y disponible
  });

  it('should provide AngularFirestoreModule', () => {
    const firestore = TestBed.inject(AngularFirestoreModule);
    expect(firestore).toBeTruthy(); // Verifica que AngularFirestoreModule esté configurado correctamente
  });

  it('should provide AngularFireAuthModule', () => {
    const authModule = TestBed.inject(AngularFireAuthModule);
    expect(authModule).toBeTruthy(); // Verifica que AngularFireAuthModule esté configurado correctamente
  });

  it('should provide HttpClientModule', () => {
    const httpClient = TestBed.inject(HttpClientModule);
    expect(httpClient).toBeTruthy(); // Verifica que HttpClientModule esté configurado correctamente
  });
});
