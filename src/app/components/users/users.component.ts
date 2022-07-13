import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {InfoService, IUsers} from "../../core/service/info.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  listOfUsers: IUsers = null;
  isLoading: boolean = true;
  currentPage: number

  constructor(
    private _info: InfoService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo() {
    this.isLoading = true;
    this._info.getUsersInfo(this.currentPage).subscribe(data => {
      if (data) {
        this.listOfUsers = data
      }
      this.isLoading = false;
    })
  }

  navigateTo(link: string) {
    this._router.navigate([link]);
  }

  deleteUser(index: number) {
    this._info.deleteUserInfoById(this.listOfUsers.data[index].id).subscribe()
    this.listOfUsers.data.splice(index, 1)
  }
}
