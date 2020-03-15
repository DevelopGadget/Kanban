import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import Forms from '../../models/forms';
import User from 'src/app/models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  SignUpForm: FormGroup = Forms.FormSignUp;

  constructor(private _snackBar: MatSnackBar, private _authService: AuthService, private _router: Router) { }

  SignUp(){
    if(this.SignUpForm.valid){
      this._authService.SignUp(this.SignUpForm).subscribe(this.SignUpSuccess, this.SignUpError);
    }else{
      this.showSnack('Error verifique la entrada de datos');
    }
  }

  SignUpSuccess(user: User) {

  }

  SignUpError(err: HttpErrorResponse){

  }

  showSnack(msg: string){
    this._snackBar.open(msg, 'Ok', {
      duration: 3000,
      panelClass: ['snack-error']
    });
  }

}
