import { Component, Input, OnInit } from '@angular/core';
import { Tool } from 'src/app/_models/tools';

@Component({
  selector: 'app-tools-card-admin',
  templateUrl: './tools-card-admin.component.html',
  styleUrls: ['./tools-card-admin.component.css']
})
export class ToolsCardAdminComponent implements OnInit {
  @Input() tool: Tool
  closeToService: boolean;
  constructor() { }

  ngOnInit(): void {
    this.close()
    this.nullPhotoUrl()
    console.log(this.tool.dateOfService)
  }

  close() {
    if (this.tool.serviceDate < 20) {
      this.closeToService = true
    }
  }

  nullPhotoUrl() {
    if (this.tool.photoUrl === null) { 
      this.tool.photoUrl = './assets/tool1.jpg'
    }
  }

}
