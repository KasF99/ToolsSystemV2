import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tool } from 'src/app/_models/tools';
import { ToolService } from 'src/app/_services/tool.service';

@Component({
  selector: 'app-tools-edit-admin',
  templateUrl: './tools-edit-admin.component.html',
  styleUrls: ['./tools-edit-admin.component.css']
})
export class ToolsEditAdminComponent implements OnInit {

  tool: Tool
  constructor(public toolService: ToolService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadTool()
  }

  loadTool() {
    this.toolService.getTool(this.route.snapshot.paramMap.get('toolname')).subscribe(tool => {
      this.tool = tool
    })
    
  }

}
