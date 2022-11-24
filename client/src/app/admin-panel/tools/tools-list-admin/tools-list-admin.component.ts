import { Component, OnInit } from '@angular/core';
import { Tool } from 'src/app/_models/tools';
import { ToolService } from 'src/app/_services/tool.service';

@Component({
  selector: 'app-tools-list-admin',
  templateUrl: './tools-list-admin.component.html',
  styleUrls: ['./tools-list-admin.component.css']
})
export class ToolsListAdminComponent implements OnInit {

  tools: Tool[] = []
  constructor(public toolService: ToolService) { }

  ngOnInit(): void {
    this.loadTools()
  }

  loadTools() {
    this.toolService.getTools().subscribe(tools => {
      this.tools = tools
    })
  }

  

}
