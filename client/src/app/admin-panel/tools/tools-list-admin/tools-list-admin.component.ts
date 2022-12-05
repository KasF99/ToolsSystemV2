import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Pagination } from 'src/app/_models/paginations';
import { Tool } from 'src/app/_models/tools';
import { ToolsParams } from 'src/app/_models/toolsParams';
import { AccountService } from 'src/app/_services/account.service';
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
  pageNumber = 1
  pageSize = 5

  constructor(public toolService: ToolService, public accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(response => {
      this.toolParams = new ToolsParams();
    })
  } 

  

  ngOnInit(): void {
    // this.tools$ = this.toolService.getTools();
    this.loadTools()
  }

  loadTools() {
    if(!this.toolParams) return
    this.toolService.getTools(this.toolParams).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.tools = response.result
          this.pagination = response.pagination
        }
      }
    })
  }

  pageChanged(event: any) {
    if (this.toolParams && this.toolParams?.pageNumber !== event.page) {
      this.toolParams.pageNumber = event.page;
      this.loadTools()
    }
   
  }

}
