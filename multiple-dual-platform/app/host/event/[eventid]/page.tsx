"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './EventDetail.module.css';
import {
  getEventById,
  getRoundsByEventId,
  updateEventStatus,
  addPlayerToEvent,
  createRound,
} from '@/server/lib/service/eventService';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import PlayerList from '@/components/PlayerList';
import QrCodeModal from '@/components/QrCodeModal'; // QRコードモーダルのインポート
import toast from 'react-hot-toast';
import { Sts_Event_Status } from '@/server/status/event_status';
import { Event, Player } from '@/server/lib/types/event';

const EventDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const eventId = pathSegments[pathSegments.indexOf('event') + 1];
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const fetchEvent = async () => {
    const eventData = await getEventById(eventId!);
    if (eventData) {
      setEvent(eventData);
    }
  };

  const handleStartEvent = async () => {
    if (window.confirm('Are you sure you want to start this event?')) {
      await updateEventStatus(eventId, Sts_Event_Status.IN_PROGRESS);
      toast.success('Event started');
      fetchEvent();
    }
  };

  const handleEndEvent = async () => {
    if (window.confirm('Are you sure you want to end this event?')) {
      await updateEventStatus(eventId, Sts_Event_Status.COMPLETED);
      toast.success('Event ended');
      fetchEvent();
    }
  };

  const handleEditEvent = () => {
    router.push(`/host/event/${eventId}/edit`);
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Event Details</h1>
      <p><strong>Name:</strong> {event.name}</p>
      <p><strong>Type:</strong> {event.event_type}</p>
      <p><strong>Mode:</strong> {event.match_mode}</p>
      <p><strong>Host:</strong> {event.host_name}</p>
      <p><strong>Players:</strong> {event.players_number}</p>
      <p><strong>Date:</strong> {new Date(event.date || new Date()).toLocaleDateString()}</p>
      <p><strong>Start Time:</strong> {new Date(event.start_time || new Date()).toLocaleDateString()}</p>
      <p><strong>End Time:</strong> {new Date(event.end_time || new Date()).toLocaleDateString()}</p>
      <p><strong>Address:</strong> {event.address}</p>
      <p><strong>Pre-registration Decklist:</strong> {event.pre_registration_decklist ? 'Yes' : 'No'}</p>
      <p><strong>Status:</strong> {event.status}</p>
      <Button onClick={() => router.push(`/host/event/${eventId}/players`)}>View Players</Button>
      {event.status === Sts_Event_Status.NOT_STARTED && (
        <Button onClick={handleStartEvent}>Start Event</Button>
      )}
      {event.status === Sts_Event_Status.IN_PROGRESS && (
        <Button onClick={handleEndEvent}>End Event</Button>
      )}
      <Button onClick={handleEditEvent}>Edit Event</Button>
      <Button back>Back</Button>
    </div>
  );
};

export default EventDetail;
