import { TestBed } from '@angular/core/testing';

import { AuthFirebase } from './auth-firebase';

describe('AuthFirebase', () => {
  let service: AuthFirebase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthFirebase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
