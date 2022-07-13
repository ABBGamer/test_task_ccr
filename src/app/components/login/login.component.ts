import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthorizationService} from "../../core/service/authorization.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {finalize} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = new FormControl('')
  pass = new FormControl('')
  isVisible: boolean = true
  name: string = ''
  isLoading: boolean = false;

  constructor(
    private _router: Router,
    private _authService: AuthorizationService,
    private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.login.setValue('eve.holt@reqres.in')
    this.pass.setValue('cityslicka')
  }

  checkUser() {
    this.isLoading = true;
    if (this.pass.value != '') {
      this._authService.checkUser(this.login.value || '', this.pass.value || '')
        .pipe(finalize(() => {
          this.isLoading = false
        }))
        .subscribe({
          next: data => {
            if (data.token) {
              this._snackBar.open('Успешно авторизованы!')
              this._router.navigate(['users'])
            }
          },
          error: (err) => {
            this._snackBar.open(err.error.error)
            console.log(err)
          }
        })
    } else {
      this._snackBar.open('Введите все поля!')
      this.isLoading = false
    }
  }
}
