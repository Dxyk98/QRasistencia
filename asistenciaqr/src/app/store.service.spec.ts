import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StoreService } from './store.service';
import { of } from 'rxjs';

describe('StoreService', () => {
  let service: StoreService;
  let firestoreMock: any;

  beforeEach(() => {
    firestoreMock = {
      collection: jasmine.createSpy('collection').and.returnValue({
        doc: jasmine.createSpy('doc').and.returnValue({
          set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
          valueChanges: jasmine
            .createSpy('valueChanges')
            .and.returnValue(of({})),
        }),
      }),
    };

    TestBed.configureTestingModule({
      providers: [
        StoreService,
        { provide: AngularFirestore, useValue: firestoreMock },
      ],
    });

    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save user data to Firestore', async () => {
    const uid = 'user123';
    const userData = { name: 'John Doe', email: 'john@example.com' };

    await service.saveUserData(uid, userData);

    expect(firestoreMock.collection).toHaveBeenCalledWith('Users');
    expect(firestoreMock.collection('Users').doc).toHaveBeenCalledWith(uid);
    expect(firestoreMock.collection('Users').doc(uid).set).toHaveBeenCalledWith(
      userData
    );
  });

  it('should retrieve user data from Firestore', () => {
    const uid = 'user123';

    service.getUserData(uid);

    expect(firestoreMock.collection).toHaveBeenCalledWith('Users');
    expect(firestoreMock.collection('Users').doc).toHaveBeenCalledWith(uid);
    expect(
      firestoreMock.collection('Users').doc(uid).valueChanges
    ).toHaveBeenCalled();
  });
});
