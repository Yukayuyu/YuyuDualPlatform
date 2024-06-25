import { db } from '@/server/auth/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const getMatchById = async (eventId: string, roundId: string, matchId: string) => {
  const docRef = doc(db, 'events', eventId, 'rounds', roundId, 'matches', matchId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const updateMatchResult = async (eventId: string, roundId: string, matchId: string, result: string) => {
  const matchRef = doc(db, 'events', eventId, 'rounds', roundId, 'matches', matchId);
  await updateDoc(matchRef, { result });
};
