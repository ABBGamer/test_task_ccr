import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, take} from "rxjs";

export interface IUsers {
  "page": number,
  "per_page": number,
  "total": number,
  "total_pages": number,
  "data": IUser[],
  "support": {
    "url": string,
    "text": string
  }
}

export interface IUser {
  "id": number,
  "email": string,
  "first_name": string,
  "last_name": string,
  "avatar": string
}


export interface IResources {
  "page": number,
  "per_page": number,
  "total": number,
  "total_pages": number,
  "data": IResource[],
  "support": {
    "url": string,
    "text": string
  }
}

export interface IResource {
  "id": number,
  "name": string,
  "year": number,
  "color": string,
  "pantone_value": string
}

export interface IUserInfo {
  "data": IUser,
  "support": {
    "url": string,
    "text": string
  }
}

const LINK = 'https://reqres.in/'

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(
    private _http: HttpClient
  ) {
  }


  getUsersInfo(pageId: number): Observable<IUsers> {
    const url = LINK + 'api/users?page=' + pageId;
    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    }
    return this._http.get<IUsers>(url, {headers: headers}).pipe(take(1))
  }

  getResourcesInfo() {
    const url = LINK + 'api/unknown/';
    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    }
    return this._http.get<IResources>(url, {headers: headers}).pipe(take(1))
  }

  getUserInfoById(id: number) {
    const url = LINK + 'api/users/' + id;
    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    }
    return this._http.get<IUserInfo>(url, {headers: headers}).pipe(take(1))
  }

  deleteUserInfoById(id: number) {
    const url = LINK + 'api/users/' + id;
    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    }
    return this._http.delete<IUserInfo>(url, {headers: headers}).pipe(take(1))
  }

  changeUserInfo(changedInfo:IUser) {
  // changeUserInfo(id: number, first_name: string, last_name: string, email: string, avatar: string) {
    const url = LINK + 'api/users/' + changedInfo.id;
    let userInfo = {
      "id": changedInfo.id,
      "email": changedInfo.email,
      "first_name": changedInfo.first_name,
      "last_name": changedInfo.last_name,
      "avatar": changedInfo.avatar
    }

    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    }
    return this._http.patch(url, userInfo, {headers: headers}).pipe(take(1))
  }

}
