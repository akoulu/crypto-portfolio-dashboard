import { TestBed } from '@angular/core/testing';
import { FirebaseApp } from 'firebase/app';

import { Firebase } from './firebase';
import { FIREBASE_APP } from './firebase.providers';

describe('Firebase', () => {
  let service: Firebase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FIREBASE_APP,
          useValue: { options: { projectId: 'test-project' } } as FirebaseApp,
        },
        Firebase,
      ],
    });
    service = TestBed.inject(Firebase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose project id from config', () => {
    expect(service.projectId).toBe('test-project');
  });
});
