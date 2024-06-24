import { db } from '@/server/auth/firebase';
import { collection, doc, getDoc, getDocs, updateDoc, addDoc } from 'firebase/firestore';

export const getEventById = async (eventId: string) => {
  const docRef = doc(db, 'events', eventId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const getRoundsByEventId = async (eventId: string) => {
  const roundsRef = collection(db, 'events', eventId, 'rounds');
  const roundsSnap = await getDocs(roundsRef);
  return roundsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateEventStatus = async (eventId: string, status: string) => {
  const docRef = doc(db, 'events', eventId);
  await updateDoc(docRef, { status });
};

export const addPlayerToEvent = async (eventId: string, player: any) => {
  const docRef = doc(db, 'events', eventId);
  const eventSnap = await getDoc(docRef);
  if (eventSnap.exists()) {
    const eventData = eventSnap.data();
    const updatedParticipants = [...(eventData.participants || []), player];
    await updateDoc(docRef, { participants: updatedParticipants });
  }
};

export const createRound = async (eventId: string, roundName: string, participants: any[]) => {
  const roundsRef = collection(db, 'events', eventId, 'rounds');
  const roundDoc = await addDoc(roundsRef, { name: roundName });
  const matchesRef = collection(db, 'events', eventId, 'rounds', roundDoc.id, 'matches');
  for (let i = 0; i < participants.length; i += 2) {
    if (participants[i + 1]) {
      await addDoc(matchesRef, {
        player1: participants[i],
        player2: participants[i + 1],
        status: 'Not Started',
      });
    } else {
      await addDoc(matchesRef, {
        player1: participants[i],
        player2: null,
        status: 'Not Started',
      });
    }
  }
  return roundDoc.id;
};
