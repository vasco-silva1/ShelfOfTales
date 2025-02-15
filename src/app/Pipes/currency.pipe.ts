import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrencyPipe',
  standalone: true
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number, currency: string = '€', displaySymbol: boolean = true): string {
    if (value == null) return ''; // Avoid null/undefined errors

    let formattedValue = value.toFixed(2); // Format with 2 decimals
    return displaySymbol ? ` ${formattedValue} ${currency}` : formattedValue;
  }

}
