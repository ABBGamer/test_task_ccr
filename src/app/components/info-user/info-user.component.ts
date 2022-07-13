import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InfoService, IUserInfo} from "../../core/service/info.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {FormControl} from "@angular/forms";

@UntilDestroy()

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {
  currentUserId: number;
  userInfo: IUserInfo = null;
  isLoading: boolean = false;
  isToChange: boolean = false;
  nameBtn = "Изменить"

  first_name = new FormControl('')
  last_name = new FormControl('')
  email = new FormControl('')

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _info: InfoService
  ) {
  }

  ngOnInit(): void {
    this._route.params
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        const bufId = +data['id'];
        if (bufId) {
          this.currentUserId = data['id'];
          this._getUserInfo()
        } else {
          this._router.navigate(['users'])
        }
      })
  }

  changeUserInfo() {
    this.isToChange = !this.isToChange
    if (this.isToChange) {
      this.nameBtn = 'Скрыть'
      this.first_name.setValue(this.userInfo.data.first_name)
      this.last_name.setValue(this.userInfo.data.last_name)
      this.email.setValue(this.userInfo.data.email)
    } else {
      this.nameBtn = 'Изменить'
    }
  }

  saveUserInfo() {
    this.isToChange = !this.isToChange
    if (this.isToChange) {
      this.nameBtn = 'Скрыть'
    } else {
      this.nameBtn = 'Изменить'
    }
    this._info.changeUserInfo(
      this.userInfo.data.id,
      this.userInfo.data.first_name,
      this.userInfo.data.last_name,
      this.userInfo.data.email,
      this.userInfo.data.avatar,
    ).subscribe(data => {
    })
  }

  private _getUserInfo() {
    this.isLoading = true;
    this._info.getUserInfoById(this.currentUserId).subscribe(data => {
      if (data) {
        this.userInfo = data;
      }
      this.isLoading = false;
    })
  }
}
