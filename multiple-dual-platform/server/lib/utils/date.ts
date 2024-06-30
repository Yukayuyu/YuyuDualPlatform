import { Timestamp } from 'firebase/firestore';

export const toDateString = (date: Date | Timestamp | string | null | undefined): string => {
  if (!date) return '';
  const dateObj = date instanceof Timestamp ? date.toDate() : (date instanceof Date ? date : new Date(date));
  return dateObj.toISOString().substring(0, 10);
};

export const toTimeString = (date: Date | Timestamp | string | null | undefined): string => {
  if (!date) return '';
  if (typeof date === 'string') return date;
  const dateObj = date instanceof Timestamp ? date.toDate() :  (date instanceof Date ? date : new Date(date));
  return dateObj.toISOString().substring(11, 16);
};
