import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AuthorizationService} from "../../core/service/authorization.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter();

  constructor(
    private _router: Router,
    private _authService: AuthorizationService
  ) {
  }

  logOut() {
    this._authService.setTokens(null);
    this._router.navigate(['auth'])
  }

  ngOnInit(): void {
  }
}
