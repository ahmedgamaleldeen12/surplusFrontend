import { CommonModule } from '@angular/common';
import {Component,ElementRef,Input,OnInit,Self,ViewChild} from '@angular/core';
import {ControlValueAccessor,FormsModule,NgControl,ReactiveFormsModule,} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInputComponent implements ControlValueAccessor, OnInit {
  @ViewChild('input', { static: true }) input!: ElementRef;
  @Input() type = 'text';
  @Input() label = 'string';

  value: string = '';
  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control?.validator ? [control.validator] : [];
    const asyncValidators = control?.asyncValidator
      ? [control.asyncValidator]
      : [];

    control?.setValidators(validators);
    control?.setAsyncValidators(asyncValidators);
    control?.updateValueAndValidity();
  }

  handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  writeValue(obj: any): void {
    this.value = obj || '';
    if (this.input) {
      this.input.nativeElement.value = this.value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
