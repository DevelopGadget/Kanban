import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import Forms from '../../models/forms';
import User from 'src/app/models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CodeDialogComponent } from '../code-dialog/code-dialog.component';
import EmailValidatorCode from 'src/app/models/email_validator_code';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  SignUpForm: FormGroup = Forms.FormSignUp;
  Loading: boolean = false;

  constructor(private _snackBar: MatSnackBar, private _authService: AuthService, private _router: Router, public dialog: MatDialog) {
    this._router.events.subscribe(val => this.SignUpForm.reset());
  }

  SignUp() {
    this.Loading = true;
    if (this.SignUpForm.valid) {
      this._authService.SignUp(this.SignUpForm).subscribe(this.SignUpSuccess, this.SignUpError);
    } else {
      this.Loading = false;
      this.showSnack('Error verifique la entrada de datos');
    }
  }

  SignUpSuccess = (user: EmailValidatorCode) => {
    this.Loading = false;
    localStorage.setItem('email_not_verified', JSON.stringify(user));
    this._router.navigate(['/login']);
  }

  SignUpError = (err: HttpErrorResponse) => {
    this.Loading = false;
    if (err.status == 409)
      this.showSnack('Error usuario duplicado');
    else if (err.status === 406)
      this.showSnack('Error verifique la entrada de datos');
    else
      this.showSnack('Error interno vuelva a intentar');
  }

  showSnack(msg: string) {
    this._snackBar.open(msg, 'Ok', {
      duration: 3000,
      panelClass: ['snack-error']
    });
  }

  ShowDialog() {
    const dialogRef = this.dialog.open(CodeDialogComponent, {
      width: '360px',
      data: { Title: 'FernandoAraujo738', Code: '', IsOk: false },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
