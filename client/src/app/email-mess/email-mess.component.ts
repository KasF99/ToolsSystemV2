import { Component, OnInit } from '@angular/core';
import { Tool } from '../_models/tools';

@Component({
  selector: 'app-email-mess',
  templateUrl: './email-mess.component.html',
  styleUrls: ['./email-mess.component.css']
})
export class EmailMessComponent implements OnInit {

  tool: Tool
  
  constructor() { }

  ngOnInit(): void {
  }
  
  
}
