import { TestBed } from '@angular/core/testing';

import { FirestoreFirebase } from './firestore-firebase';

describe('FirestoreFirebase', () => {
  let service: FirestoreFirebase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreFirebase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
