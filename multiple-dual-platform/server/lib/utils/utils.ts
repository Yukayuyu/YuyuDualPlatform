import clsx, { ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export const nanoid = (n : number) => {customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    n
)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
