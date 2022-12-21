import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-set-prop-table',
  templateUrl: './set-prop-table.component.html',
  styleUrls: ['./set-prop-table.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SetPropTableComponent,
      multi: true,
    }
  ]
})
export class SetPropTableComponent implements ControlValueAccessor {

  value!: boolean;
  onChange!: (value: string) => void;
  onTouched!: () => void;
  constructor() { }

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
