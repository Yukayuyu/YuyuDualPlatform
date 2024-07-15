"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getEventById, updateEventDetails } from '@/server/lib/service/eventService'; // サービスをインポート
import { Event } from '@/server/lib/types/event'; // 型をインポート
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { toDateString, toTimeString } from '@/server/lib/utils/date'; // 日付変換関数をインポート
import styles from '@/styles/host/EditEvent.module.css'; // CSSモジュールをインポート
import useIsReady from '@/hooks/use-is-ready'
import { Loading } from '@/components/Loading';

const EditEvent = () => {
  const router = useRouter();
  const isReady = useIsReady();
  const [eventDetails, setEventDetails] = useState<Event | null>(null);
  const {eventId} = router.query;

  useEffect(() => {
    console.log(isReady, eventId)
    fetchEvent();
  }, [eventId, isReady]);

  const fetchEvent = async () => {
    if(typeof eventId === 'string'){
      const eventData = await getEventById(eventId!);
      if (eventData) {
        setEventDetails(eventData);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEventDetails({
      ...eventDetails!,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    if (eventDetails && typeof eventId === 'string') {
      await updateEventDetails(eventId, eventDetails);
      //router.push(`/host/event/${eventId}`);
      router.back();
    }
  };

  if (!isReady || !eventDetails) {
    return <Loading>Loading...</Loading>;
  }


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Event</h1>
      <Input
        type="text"
        name="name"
        value={eventDetails.name}
        onChange={handleChange}
        placeholder="Event Name"
        required
      />
      <Input
        type="text"
        name="event_type"
        value={eventDetails.event_type}
        onChange={handleChange}
        placeholder="Event Type"
        required
      />
      <Input
        type="text"
        name="match_mode"
        value={eventDetails.match_mode}
        onChange={handleChange}
        placeholder="Match Mode"
        required
      />
      <Input
        type="text"
        name="host_name"
        value={eventDetails.host_name}
        onChange={handleChange}
        placeholder="Host Name"
        required
      />
      <Input
        type="number"
        name="players_number"
        value={eventDetails.players_number}
        onChange={handleChange}
        placeholder="Number of Players"
        required
      />
      <Input
        type="date"
        name="date"
        value={toDateString(eventDetails.date)}
        onChange={handleChange}
        required
      />
      <Input
        type="time"
        name="start_time"
        value={toTimeString(eventDetails.start_time)}
        onChange={handleChange}
        required
      />
      <Input
        type="time"
        name="end_time"
        value={toTimeString(eventDetails.end_time)}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="address"
        value={eventDetails.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />
      <div className={styles.checkbox}>
        <label>
          <input
            type="checkbox"
            name="pre_registration_decklist"
            checked={eventDetails.pre_registration_decklist}
            onChange={handleChange}
          />
          Pre-registration Decklist
        </label>
      </div>
      <Button onClick={handleSubmit}>Save Changes</Button>
      <Button back>back</Button>
    </div>
  );
};

export default EditEvent;
