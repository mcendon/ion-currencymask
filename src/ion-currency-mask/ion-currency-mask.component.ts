import { Component, Input, forwardRef } from '@angular/core';
import { CurrencyMask } from './currency-mask';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ion-currency-mask',
  templateUrl: 'ion-currency-mask.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonCurrencyMaskComponent),
      multi: true
    }
  ]
})
export class IonCurrencyMaskComponent implements ControlValueAccessor {

  @Input() placeholder: string;
  @Input() label: string;
  @Input() typeLabel = '';
  @Input() clearInput = false;
  @Input() lastChild = false;
  @Input() disabled = false;
  @Input() noDecimals = false;
  @Input() reverse = false;

  public valueIonInput: string;

  private currencyMask = new CurrencyMask();
  private value: number;
  private propagateChange = (_: any) => { };


  constructor() { }

  public registerOnTouched() {}

  public writeValue(obj: number) {
    this.valueIonInput = this.currencyMask.detectAmountReverse(obj, this.reverse);
    if (obj) {
      this.keyUpEvent(null);
      this.value = obj;
    } else {
      this.value = null;
    }
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public onChange(event) {
    if (this.valueIonInput) {
      this.value = this.reverse ? Number.parseFloat(this.valueIonInput.replace(/[\,]/g, '')) : Number.parseFloat(this.valueIonInput.replace(/[\.]/g, '').replace(/[,]/g, '.'));
    } else {
      this.value = null;
    }
    this.propagateChange(this.value);
  }

  public keyUpEvent(event) {
    const valueToPass = this.reverse ? this.valueIonInput.replace(/(\,)/g, '|').replace(/(\.)/g, ',').replace(/(\|)/g, '.') : this.valueIonInput;
    this.valueIonInput = this.currencyMask.detectAmount(valueToPass, this.noDecimals);
    if (this.valueIonInput && this.reverse) {
      this.valueIonInput = this.valueIonInput.replace(/(\.)/g, '|').replace(/(\,)/g, '.').replace(/(\|)/g, ',');
    }
    this.onChange(event);
  }

  public getAttrLabel(type: string) {
    return this.typeLabel === type;
  }

  public getAttrClearInput() {
    return this.clearInput ? '' : null;
  }

  public getAttrPlaceholder() {
    return this.placeholder ? this.placeholder : '';
  }

}
