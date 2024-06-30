import { Timestamp } from 'firebase/firestore';

export const toDateString = (date: Date | Timestamp | null | undefined): string => {
  if (!date) return '';
  const dateObj = date instanceof Timestamp ? date.toDate() : date;
  return dateObj.toISOString().substring(0, 10);
};

export const toTimeString = (date: Date | Timestamp | null | undefined): string => {
  if (!date) return '';
  const dateObj = date instanceof Timestamp ? date.toDate() : date;
  return dateObj.toISOString().substring(11, 16);
};
