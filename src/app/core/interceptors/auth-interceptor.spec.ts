import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { vi } from 'vitest';

import { AuthFirebase } from '../firebase/auth-firebase';
import { authInterceptor } from '../firebase/auth-firebase.interceptor';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        {
          provide: AuthFirebase,
          useValue: {
            getIdToken: vi.fn().mockResolvedValue('firebase-token'),
          },
        },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should attach Authorization header when token exists', () => {
    http.get('/api/portfolio').subscribe();

    const request = httpMock.expectOne('/api/portfolio');
    expect(request.request.headers.get('Authorization')).toBe('Bearer firebase-token');
    request.flush({});
  });
});
