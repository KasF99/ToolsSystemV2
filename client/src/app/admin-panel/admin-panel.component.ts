import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  registerMode = false
  constructor() { }

  ngOnInit(): void {
  }

  registerToggle() {
    this.registerMode =!this.registerMode
  }
  cancelRegisterMode(event: boolean) { 
    this.registerMode = false
  }

}
