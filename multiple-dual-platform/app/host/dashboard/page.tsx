"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getEvents } from '@/server/lib/service/eventService'; // サービスをインポート
import { Event } from '@/server/lib/types/event'; // 型をインポート
import styles from './Dashboard.module.css'; // CSSモジュールをインポート
import { Button } from '@/components/Button';
import CollapsibleEventList from '@/components/CollapsibleEventList'; // 共通コンポーネントをインポート
import { Sts_Event_Status } from '@/server/status/event_status';

const Dashboard = () => {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const eventData = await getEvents();
    setEvents(eventData);
  };

  const handleCreateEvent = () => {
    router.push('/host/event/create');
  };

  const filterEventsByStatus = (status: Sts_Event_Status) => {
    return events.filter((event) => event.status === status);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <Button onClick={handleCreateEvent}>Create Event</Button>
      <CollapsibleEventList title="Not Started" events={filterEventsByStatus(Sts_Event_Status.NOT_STARTED)} />
      <CollapsibleEventList title="Player Registration" events={filterEventsByStatus(Sts_Event_Status.PLAYER_REGISTRATION)} />
      <CollapsibleEventList title="In Progress" events={filterEventsByStatus(Sts_Event_Status.IN_PROGRESS)} />
      <CollapsibleEventList title="Completed" events={filterEventsByStatus(Sts_Event_Status.COMPLETED)} />
      <CollapsibleEventList title="Canceled" events={filterEventsByStatus(Sts_Event_Status.CANCELED)} />
    </div>
  );
};

export default Dashboard;
