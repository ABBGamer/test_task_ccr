import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

interface INavBtn {
  name: string,
  path: string
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  navBtns: INavBtn[] = [
    {name: 'Пользователи', path: 'users'},
    {name: 'Ресурсы', path: 'resources'}
  ]

  constructor(
    private _router: Router
  ) {
  }

  ngOnInit(): void {
  }
}
