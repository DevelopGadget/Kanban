import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../models/user';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Http: HttpClient) { }

  Login(Credentials: FormGroup): Observable<User> {
    return this.Http.post<User>('', Credentials.value);
  }

  SignUp(UserData: FormGroup): Observable<User> {
    return this.Http.post<User>('', UserData.value);
  }
}
