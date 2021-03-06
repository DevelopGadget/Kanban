import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';
import Forms from '../../models/forms';
import { AuthService } from 'src/app/services/auth.service';
import User from 'src/app/models/user';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CodeDialogComponent } from '../code-dialog/code-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import EmailValidatorCode from 'src/app/models/email_validator_code';
import ResponseData from 'src/app/models/response_data';
import Dialog from 'src/app/models/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup = Forms.FormLogin;
  Loading: boolean = false;

  constructor(private _snackBar: MatSnackBar, private _authService: AuthService, private _router: Router, public dialog: MatDialog) {
    this._router.events.subscribe(val => this.LoginForm.reset());
  }

  ngOnInit(): void {
    this.Init();
  }

  LoginPage() {
    this.Loading = true;
    if (this.LoginForm.valid) {
      this._authService.Login(this.LoginForm).subscribe(this.LoginSuccess, this.LoginError);
    } else {
      this.Loading = false;
      this.showSnack('Error verifique la entrada de datos');
    }
  }

  showSnack(msg: string) {
    this._snackBar.open(msg, 'Ok', {
      duration: 3000,
      panelClass: ['snack-error']
    });
  }

  LoginSuccess(user: User) {
    this.Loading = false;
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(user));
    this._router.navigate(['/home']);
  }

  LoginError = (err: HttpErrorResponse) => {
    this.Loading = false;
    if ((err.error as ResponseData).CodeError.Code === 'A002')
      this.showSnack('Usuario inactivo restaure su contraseña para activar su cuenta');
    else if ((err.error as ResponseData).CodeError.Code === 'A004') {
      localStorage.setItem('email_not_verified', JSON.stringify((err.error as ResponseData).Message));
      this.Init();
    } else {
      this.showSnack('Usuario o contraseña erronea');
    }
  };

  Init() {
    if (localStorage.getItem('email_not_verified')) {
      const valid: EmailValidatorCode = JSON.parse(localStorage.getItem('email_not_verified'));
      if (valid.User.includes('@'))
        valid.User = valid.User.split('@')[0];
      this.ShowDialog(valid);
    }else if(localStorage.getItem('user')){
      this._router.navigate(['/home']);
    }
  }

  ShowDialog(user: EmailValidatorCode) {
    this.dialog.open(CodeDialogComponent, {
      width: '360px',
      data: { User: user, IsOk: false },
      disableClose: true
    }).afterClosed().subscribe(this.DialogRefClosed);
  }

  DialogRefClosed = (result: Dialog) => {
    if (result.IsOk) {
      this.Loading = true;
      this._authService.EmailValidatorCode(result.User).subscribe(this.LoginSuccess, this.EmailValidationError)
    }
  }

  EmailValidationError = (err: HttpErrorResponse) => {
    this.Loading = false;
    console.log(err.error);
    if ((err.error as ResponseData).CodeError.Code === 'A006')
      this.showSnack('Código invalido');
    else
      this.showSnack('Ha ocurrido un error vuelva a intentar');
    this.Init();
  }

}
