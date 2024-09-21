import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatApt(amount: number | bigint): string {
  const APT_DECIMALS = 8;
  const amountBigInt = BigInt(amount);
  const wholePart = amountBigInt / BigInt(10 ** APT_DECIMALS);
  const fractionalPart = amountBigInt % BigInt(10 ** APT_DECIMALS);
  
  const formattedFractionalPart = fractionalPart.toString().padStart(APT_DECIMALS, '0');
  const trimmedFractionalPart = formattedFractionalPart.replace(/0+$/, '');

  if (trimmedFractionalPart === '') {
    return wholePart.toString();
  }

  return `${wholePart}.${trimmedFractionalPart}`;
}