import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToolService } from '../_services/tool.service';
import { ToolsListAdminComponent } from './tools/tools-list-admin/tools-list-admin.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  @ViewChild('adminTabs') adminTabs?: TabsetComponent
  registerMode = false
  activatedTab?: TabDirective
  @ViewChild(ToolsListAdminComponent) toolsTab: ToolsListAdminComponent


  constructor(public toolService: ToolService, public router: Router) { }

  ngOnInit(): void {
  }

  registerToggle() {
    this.registerMode = !this.registerMode
  }
  cancelRegisterMode(event: boolean) {
    this.registerMode = false
  }

  OnActivatedTab(data: TabDirective) {
    this.activatedTab = data;
    if (this.activatedTab.id === "tab1") {
     
    }
  }

}
