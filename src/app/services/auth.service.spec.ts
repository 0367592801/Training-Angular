import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Login } from '../model/login';
import { User } from '../model/user';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    const httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`isLoggedIn has default value`, () => {
    expect(service.isLoggedIn).toEqual(false);
  });

  it('it should call through login with test Data', () => {
    const testData: any = {
      token: 'react-training-token-abc-def0ghj',
      userId: '3',
    };
    const loginStub: Login = <any>{ username: '123', password: '12231455' };
    const httpTestingController = TestBed.inject(HttpTestingController);
    service.login(loginStub).subscribe((res) => {
      expect(res).toEqual(testData);
    });
    const req = httpTestingController.expectOne(
      'https://60dff0ba6b689e001788c858.mockapi.io/tokens'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('get User',async () => {
    const testData: User = {"createdAt":"2021-07-03T01:34:20.524Z","name":"Mrs. Francis McCullough","id":"1"}
    const userId: number = <number>1;
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getUser(userId).subscribe((res) => {
      expect(res).toEqual(testData);
    });
    const req = httpTestingController.expectOne(
      'https://60dff0ba6b689e001788c858.mockapi.io/users/1'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  })
});
