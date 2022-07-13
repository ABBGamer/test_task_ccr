import {Component, OnInit} from '@angular/core';
import {InfoService, IResources} from "../../core/service/info.service";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  listOfRes: IResources = null;
  isLoading: boolean = true;

  constructor(
    private _info: InfoService
  ) {
  }

  ngOnInit(): void {
    this.getResourcesInfo()
  }

  getResourcesInfo() {
    this.isLoading = true;
    this._info.getResourcesInfo().subscribe(data => {
      if (data) {
        this.listOfRes = data
      }
      this.isLoading = false;
    })
  }
}
