import { Component, OnInit, ViewChild } from '@angular/core';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Tool } from '../_models/tools';
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


  constructor(public toolService: ToolService) { }

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
     this.toolsTab.ngOnInit()
    }
  }

}
