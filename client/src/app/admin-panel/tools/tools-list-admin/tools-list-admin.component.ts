import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(public toolService: ToolService) { }

  ngOnInit(): void {
    this.tools$ = this.toolService.getTools();
  }
  
}
