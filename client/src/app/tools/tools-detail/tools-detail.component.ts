import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tool } from 'src/app/_models/tools';
import { ToolService } from 'src/app/_services/tool.service';

@Component({
  selector: 'app-tools-detail',
  templateUrl: './tools-detail.component.html',
  styleUrls: ['./tools-detail.component.css']
})
export class ToolsDetailComponent implements OnInit {
  tool: Tool
  closeToService: boolean = false

  constructor(public toolService: ToolService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadTool()
  }

  loadTool() {
    this.toolService.getTool(this.route.snapshot.paramMap.get('toolname')).subscribe(tool => {
      this.tool = tool
      this.close()
    })
    
  }

  close() {
    if (this.tool.serviceDate < 20) {
      this.closeToService = true
  }
    console.log(this.tool.serviceDate)
    console.log(this.closeToService)
  }
  

}
