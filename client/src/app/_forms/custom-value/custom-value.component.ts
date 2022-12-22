import { Component, Input, OnInit } from '@angular/core';
import { Tool } from 'src/app/_models/tools';

@Component({
  selector: 'app-custom-value',
  templateUrl: './custom-value.component.html',
  styleUrls: ['./custom-value.component.css']
})
export class CustomValueComponent implements OnInit {
  @Input() label: string;
  @Input() tool: boolean
  constructor() { }

  ngOnInit(): void {
  }


  returnAnwser(val: boolean) {
    if (val === true) {
      return true
    }

    if (val === false) {
      return false
    }

    else {
      return null
    }
  }

}
