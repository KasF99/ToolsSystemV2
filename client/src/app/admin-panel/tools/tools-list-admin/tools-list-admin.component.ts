import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/paginations';
import { Tool } from 'src/app/_models/tools';
import { ToolsParams } from 'src/app/_models/toolsParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { ToolService } from 'src/app/_services/tool.service';

@Component({
  selector: 'app-tools-list-admin',
  templateUrl: './tools-list-admin.component.html',
  styleUrls: ['./tools-list-admin.component.css']
})
export class ToolsListAdminComponent implements OnInit {

  tools: Tool[] = []
  tools$: Observable<Tool[]> = new Observable()
  pagination: Pagination | undefined
  toolParams: ToolsParams
  members: Member[] = [];
  bsConfig: Partial<BsDatepickerConfig> | undefined
  dateToSpread: Date[]

 

  constructor(public toolService: ToolService, public membersService: MembersService) {
    this.toolParams = this.toolService.getToolParams();
  } 
  
  ngOnInit(): void {
    this.loadTools()
    this.loadMembers()
  }

  loadTools() {
  {
      this.toolService.setToolParams(this.toolParams)
      this.toolService.getTools(this.toolParams).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.tools = response.result
            this.pagination = response.pagination
          }
        }
      })
    }
  }

  loadMembers() {
    this.membersService.getMembers().subscribe(members => {
      this.members = members
    })
  }

  pageChanged(event: any) {
    if (this.toolParams && this.toolParams?.pageNumber !== event.page) {
      this.toolParams.pageNumber = event.page;
      this.toolService.setToolParams(this.toolParams)
      this.loadTools()
    }
  }

  resetFilters() {
    this.toolParams = this.toolService.resetToolParams()
    this.loadTools();
  } 
}
