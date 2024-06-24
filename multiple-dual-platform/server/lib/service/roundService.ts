import { db } from '@/server/auth/firebase';
import { collection, doc, getDoc, getDocs, addDoc } from 'firebase/firestore';

export const getRoundById = async (eventId: string, roundId: string) => {
  const docRef = doc(db, 'events', eventId, 'rounds', roundId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const getMatchesByRoundId = async (eventId: string, roundId: string) => {
  const matchesRef = collection(db, 'events', eventId, 'rounds', roundId, 'matches');
  const matchesSnap = await getDocs(matchesRef);
  return matchesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createMatch = async (eventId: string, roundId: string, match: any) => {
  const matchesRef = collection(db, 'events', eventId, 'rounds', roundId, 'matches');
  const matchDoc = await addDoc(matchesRef, match);
  return matchDoc.id;
};
