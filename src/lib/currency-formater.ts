export class CurrencyFormatter {
  static toVND(amount: number): string {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace(/\s?₫/, 'đ');
  }

  static toNumber(text: string): number {
    if (text.includes('.')) {
      const normalizedValue = text.split('.').join('');
      return parseInt(normalizedValue, 10);
    } else {
      return parseInt(text, 10);
    }
  }

  static format(number: number | string, sign: boolean = false): string {
    const negativeSign = sign && String(number).startsWith('-') ? '-' : '';
    const numericValue = String(number).replace(/\D/g, '');
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return negativeSign + formattedValue;
  }
}
