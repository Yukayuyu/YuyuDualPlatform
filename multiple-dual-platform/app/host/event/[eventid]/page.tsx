"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './EventDetail.module.css'; // CSSモジュールをインポート
import {
  getEventById,
  getRoundsByEventId,
  updateEventStatus,
  addPlayerToEvent,
  createRound,
} from '@/server/lib/service/eventService'; // サービスをインポート
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import toast from 'react-hot-toast';
import { Player } from '@/server/lib/types/event';
import { Sts_Event_Status } from '@/server/status/event_status';
import PlayerList from '@/components/palyer-list';

const EventDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const eventId = pathSegments[pathSegments.indexOf('event') + 1];
  const [event, setEvent] = useState<any>(null);
  const [rounds, setRounds] = useState<any[]>([]);
  const [roundName, setRoundName] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    console.log('Event ID:', eventId);
    if (eventId) {
      fetchEvent();
      fetchRounds();
    }
  }, [eventId]);

  const fetchEvent = async () => {
    const eventData = await getEventById(eventId!);
    if (eventData) {
      setEvent(eventData);
      setPlayers((eventData as any).players || []);
    }
  };

  const fetchRounds = async () => {
    const fetchedRounds = await getRoundsByEventId(eventId!);
    setRounds(fetchedRounds);
  };

  const startPlayerRegistration = async () => {
    if (eventId) {
      await updateEventStatus(eventId, Sts_Event_Status.PLAYER_REGISTRATION);
      toast.success('Player registration started');
      fetchEvent();
    }
  };

  const startEvent = async () => {
    if (eventId) {
      await updateEventStatus(eventId, Sts_Event_Status.IN_PROGRESS);
      toast.success('Event started');
      fetchEvent();
    }
  };

  const addPlayer = async () => {
    if (eventId && playerName) {
      const newPlayer: Player = {
        _no: players.length + 1,
        id: `${eventId}-${players.length + 1}`,
        player_name: playerName,
        wins: 0,
        points: 0,
        win_rate: 0,
        result_list: [],
        opponent_list: [],
        round_now: 0,
        match_id_now: null,
      };

      await addPlayerToEvent(eventId, newPlayer);
      setPlayers([...players, newPlayer]);
      setPlayerName('');
      toast.success('Player added successfully');
    }
  };

  const createRoundHandler = async () => {
    if (eventId && roundName) {
      await createRound(eventId, roundName, players);
      setRoundName('');
      toast.success('Round and matches created');
      fetchRounds();
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Event Details</h1>
      <p><strong>Name:</strong> {event.name}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {event.status}</p>
      {event.status === Sts_Event_Status.NOT_STARTED && (
        <Button onClick={startPlayerRegistration}>Start Player Registration</Button>
      )}
      {event.status === Sts_Event_Status.PLAYER_REGISTRATION && (
        <div>
          <h2>Player Registration</h2>
          <Input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Player Name"
            required
          />
          <Button onClick={addPlayer}>Add Player</Button>
          <h2>Players</h2>
          <PlayerList players={players} />
          <Button onClick={startEvent}>Start Event</Button>
        </div>
      )}
      {event.status === Sts_Event_Status.IN_PROGRESS && (
        <div>
          <h2>Create Round</h2>
          <Input
            type="text"
            value={roundName}
            onChange={(e) => setRoundName(e.target.value)}
            placeholder="Round Name"
            required
          />
          <Button onClick={createRoundHandler}>Create Round</Button>
          <h2>Rounds</h2>
          <ul className={styles.list}>
            {rounds.map((round) => (
              <li key={round.id}>
                <a className={styles.link} href={`/host/event/${eventId}/round/${round.id}`}>{round.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button onClick={() => router.push(`/host/event/${eventId}/players`)}>View Players</Button>
      <Button back>Back</Button>
    </div>
  );
};

export default EventDetail;
