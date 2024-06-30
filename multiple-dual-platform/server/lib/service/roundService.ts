import { db } from '@/server/auth/firebase';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc } from 'firebase/firestore';
import { Match } from '../types/event';

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

export const updateMatchResult = async (eventId: string, roundId: string, matchId: string, result: string) => {
  const matchRef = doc(db, 'events', eventId, 'rounds', roundId, 'matches', matchId);
  await updateDoc(matchRef, { result });
};

export const addMatchToRound = async (eventId: string, roundId: string, match: Match) => {
  const matchesRef = collection(db, 'events', eventId, 'rounds', roundId, 'matches');
  await addDoc(matchesRef, match);
};
