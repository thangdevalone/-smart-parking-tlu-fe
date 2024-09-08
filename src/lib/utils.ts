import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ErrorResponse } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isErrorResponse(error: unknown): error is ErrorResponse {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export function formatCurrencyVND(amount: number): string {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace(/\s?₫/, 'đ');
}

export function currencyToNumber(input: string) {
  if (input.includes('.')) {
    const normalizedValue = input.split('.').join('');
    return parseInt(normalizedValue, 10);
  } else {
    return parseInt(input, 10);
  }
}
export function formatNumber(number: any, sign: boolean = false) {
  const negativeSign = sign && String(number).startsWith('-') ? '-' : '';

  const numericValue = String(number).replace(/\D/g, '');

  const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return negativeSign + formattedValue;
}
