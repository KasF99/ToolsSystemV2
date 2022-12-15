import { Component, forwardRef, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-set-prop',
  templateUrl: './set-prop.component.html',
  styleUrls: ['./set-prop.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SetPropComponent,
      multi: true,
    }
  ]
})
export class SetPropComponent implements ControlValueAccessor {

  @Input() label!: string;
  value!: boolean;
  onChange!: (value: string) => void;
  onTouched!: () => void;
  constructor() {}

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


}
