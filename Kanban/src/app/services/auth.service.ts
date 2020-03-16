import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../models/user';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import ResponseData from '../models/response_data';
import EmailValidatorCode from '../models/email_validator_code';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Http: HttpClient) { }

  Login(Credentials: FormGroup): Observable<User | EmailValidatorCode> {
    return this.Http.post<ResponseData>(environment.api + '/api/auth/login', Credentials.value).pipe(
      map(response => response.Message)
    );
  }

  SignUp(UserData: FormGroup): Observable<EmailValidatorCode> {
    return this.Http.post<ResponseData>(environment.api + '/api/auth/signup', UserData.value).pipe(
      map(response => response.Message)
    );
  }

  EmailValidatorCode(UserData: EmailValidatorCode): Observable<User> {
    return this.Http.put<ResponseData>(environment.api + '/api/user/email', UserData).pipe(
      map(response => response.Message)
    );
  }

}
