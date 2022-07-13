import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit,AfterContentInit {
  //@ViewChild('sidenav') public sidenav: MatSidenav;
  isOpen:boolean
  constructor(
  ) {
  }

  ngOnInit(): void {

  }


  ngAfterContentInit(): void {
    if (window.innerWidth > 1400) {
      this.isOpen=true;
    }
  }

}
