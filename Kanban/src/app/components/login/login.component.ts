import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';
import Forms from '../../models/forms';
import { AuthService } from 'src/app/services/auth.service';
import User from 'src/app/models/user';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  LoginForm: FormGroup = Forms.FormLogin;

  constructor(private _snackBar: MatSnackBar, private _authService: AuthService, private _router: Router) { }

  LoginPage() {
    if (this.LoginForm.valid) {
      this._authService.Login(this.LoginForm).subscribe(this.LoginSuccess, this.LoginError);
    } else {
      this.showSnack('Error verifique la entrada de datos');
    }
  }

  LoginSuccess(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this._router.navigate(['/home']);
  }

  LoginError(err: HttpErrorResponse){

  }

  showSnack(msg: string){
    this._snackBar.open(msg, 'Ok', {
      duration: 3000,
      panelClass: ['snack-error']
    });
  }

}
