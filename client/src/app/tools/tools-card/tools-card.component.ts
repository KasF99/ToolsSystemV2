import { Component, Input, OnInit } from '@angular/core';
import { Tool } from 'src/app/_models/tools';

@Component({
  selector: 'app-tools-card',
  templateUrl: './tools-card.component.html',
  styleUrls: ['./tools-card.component.css']
})
export class ToolsCardComponent implements OnInit {

  @Input() tool: Tool
  constructor() { }

  ngOnInit(): void {
  }

}
