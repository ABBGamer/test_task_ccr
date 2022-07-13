import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthorizationService} from "../service/authorization.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

// @UntilDestroy()

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuth: boolean = false;

  constructor(
    private _router: Router,
    private _authService: AuthorizationService
  ) {
    this._authService.accessToken$
      // .pipe(untilDestroyed(this))
      .subscribe(token => {
        this.isAuth = !!token;
      })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.isAuth) {
      return true;
    } else {
      this._router.navigate(['auth']);
      return false;
    }
  }

  // ngOnDestroy(): void {
  //   console.log('destroy')
  // }
}
