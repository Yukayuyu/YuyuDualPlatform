import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/host/Dashboard.module.css'; // CSSモジュールをインポート
import CollapsibleEventList from '@/components/CollapsibleEventList'; // 共通コンポーネントをインポート
import { useTranslation } from 'next-i18next';
import { getEvents } from '@/server/lib/service/eventService';
import { Sts_Event_Status } from '@/server/status/event_status';
import { Button } from '@/components/Button';
import { Event } from '@/server/lib/types/event';

const Dashboard = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
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
    return events.filter((event: any) => event.status === status);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('dashboard')}</h1>
      <Button onClick={handleCreateEvent}>{t('create_event')}</Button>
      <CollapsibleEventList title={t('status_not_started')} events={filterEventsByStatus(Sts_Event_Status.NOT_STARTED)} />
      <CollapsibleEventList title={t('status_player_registration')} events={filterEventsByStatus(Sts_Event_Status.PLAYER_REGISTRATION)} />
      <CollapsibleEventList title={t('status_in_progress')} events={filterEventsByStatus(Sts_Event_Status.IN_PROGRESS)} />
      <CollapsibleEventList title={t('status_completed')} events={filterEventsByStatus(Sts_Event_Status.COMPLETED)} />
      <CollapsibleEventList title={t('status_canceled')} events={filterEventsByStatus(Sts_Event_Status.CANCELED)} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default Dashboard;
