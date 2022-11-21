import { Component, Input, OnInit } from '@angular/core';
import { Tool } from 'src/app/_models/tools';

@Component({
  selector: 'app-tools-card-admin',
  templateUrl: './tools-card-admin.component.html',
  styleUrls: ['./tools-card-admin.component.css']
})
export class ToolsCardAdminComponent implements OnInit {
  @Input() tool: Tool
  constructor() { }

  ngOnInit(): void {
  }

}
