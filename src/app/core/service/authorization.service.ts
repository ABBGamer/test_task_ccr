import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, take, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface IUser {
  name: string,
  auth: {
    login: string,
    pass: string
  }
}

interface ILoginResponse {
  "token": string,
}

export interface ILoginConfig {
  "email": string,
  "password": string
}

const LINK = 'https://reqres.in/'

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {
  private _accessToken: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  readonly accessToken$: Observable<string> = this._accessToken.asObservable()

  constructor(
    private _http: HttpClient
  ) {
    const token = localStorage.getItem('token')

    if (token) {
      this._accessToken.next(token);
    }
  }

  checkUser(email: string, password: string): Observable<any> {
    const url = LINK + 'api/login';
    const body: ILoginConfig = {
      email: email,
      password: password
    }

    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    }
    return this._http.post<ILoginResponse>(url, body, {headers: headers})
      .pipe(
        take(1),
        tap(data => {

          if (data.token) {
            this.setTokens(data.token)
          }
        }),
      )
  }

  setTokens(token: string) {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
    this._accessToken.next(token)
  }
}
