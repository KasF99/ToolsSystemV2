import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/paginations';
import { Tool } from 'src/app/_models/tools';
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
  pageNumber = 1
  pageSize = 5

  constructor(public toolService: ToolService) {

  }

  

  ngOnInit(): void {
    // this.tools$ = this.toolService.getTools();
    this.loadTools()
  }

  loadTools() {
    this.toolService.getTools(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.tools = response.result
          this.pagination = response.pagination
        }
      }
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadTools()
    }
   
  }

}
