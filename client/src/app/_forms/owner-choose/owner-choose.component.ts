import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-owner-choose',
  templateUrl: './owner-choose.component.html',
  styleUrls: ['./owner-choose.component.css']
})
export class OwnerChooseComponent implements ControlValueAccessor {

  @Input() label: string;
  @Input() members: Member[];

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
   }

  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {
   
  }
  setDisabledState?(isDisabled: boolean): void {
    
  }

 

}
