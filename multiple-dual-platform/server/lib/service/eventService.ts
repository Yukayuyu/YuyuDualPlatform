import { db } from '@/server/auth/firebase';
import { collection, doc, getDoc, getDocs, updateDoc, addDoc, Timestamp } from 'firebase/firestore';
import { Player, Event, Round } from '../types/event';
import { Sts_Event_Status, Sts_Round_Status } from '@/server/status/event_status';

export const getEvents = async (): Promise<Event[]> => {
  const eventsRef = collection(db, 'events');
  const eventsSnap = await getDocs(eventsRef);
  return eventsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().date.toDate(),
  } as Event));
};


export const getEventById = async (eventId: string): Promise<Event | null> => {
  const docRef = doc(db, 'events', eventId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Event : null;
};

export const getRoundsByEventId = async (eventId: string) => {
  const roundsRef = collection(db, 'events', eventId, 'rounds');
  const roundsSnap = await getDocs(roundsRef);
  return roundsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Round));
};

export const updateEventStatus = async (eventId: string, status: string) => {
  const docRef = doc(db, 'events', eventId);
  await updateDoc(docRef, { status });
};

export const addPlayerToEvent = async (eventId: string, player: Player) => {
  const docRef = doc(db, 'events', eventId);
  const eventSnap = await getDoc(docRef);
  if (eventSnap.exists()) {
    const eventData = eventSnap.data();
    const updatedPlayers = [...(eventData.players || []), player];
    await updateDoc(docRef, { players: updatedPlayers });
  }
};

export const updatePlayerInEvent = async (eventId: string, player: Player) => {
  const docRef = doc(db, 'events', eventId);
  const eventSnap = await getDoc(docRef);
  if (eventSnap.exists()) {
    const eventData = eventSnap.data();
    const updatedPlayers = eventData.players.map((p: Player) => p.id === player.id ? player : p);
    await updateDoc(docRef, { players: updatedPlayers });
  }
};

export const createRound = async (eventId: string, roundName: string, players: Player[]) => {
  const roundsRef = collection(db, 'events', eventId, 'rounds');
  const roundDoc = await addDoc(roundsRef, { name: roundName, players: players, results: [] });

  // TODO:マッチの自動生成
  const matchesRef = collection(db, 'events', eventId, 'rounds', roundDoc.id, 'matches');
  for (let i = 0; i < players.length; i += 2) {
    if (players[i + 1]) {
      await addDoc(matchesRef, {
        round: 1,
        player1: players[i]._no,
        player2: players[i + 1]._no,
        status: Sts_Round_Status.NOT_STARTED,
      });
    } else {
      await addDoc(matchesRef, {
        round: 1,
        player1: players[i]._no,
        player2: null,
        status: Sts_Round_Status.NOT_STARTED,
      });
    }
  }

  return roundDoc.id;
};

export const addEvent = async (eventDetails: Omit<Event, 'id' | 'rounds' | 'status'>) => {
  const eventsRef = collection(db, 'events');
  await addDoc(eventsRef, {
    ...eventDetails,
    date:  eventDetails.date ? Timestamp.fromDate(new Date(eventDetails.date)) : null,
    status: Sts_Event_Status.NOT_STARTED,
    rounds: [],
  });
};

export const updateEventDetails = async (eventId: string, eventDetails: Event) => {
  const docRef = doc(db, 'events', eventId);
  await updateDoc(docRef, eventDetails);
};