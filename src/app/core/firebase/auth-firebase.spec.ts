import { TestBed } from '@angular/core/testing';
import { Auth } from 'firebase/auth';

import { AuthFirebase } from './auth-firebase';
import { FIREBASE_AUTH } from './firebase.providers';

describe('AuthFirebase', () => {
  let service: AuthFirebase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FIREBASE_AUTH,
          useValue: { currentUser: null } as Auth,
        },
        AuthFirebase,
      ],
    });

    service = TestBed.inject(AuthFirebase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose user$ observable', () => {
    expect(service.user$).toBeTruthy();
  });
});
