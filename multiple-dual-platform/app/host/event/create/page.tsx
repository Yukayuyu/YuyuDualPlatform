"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addEvent } from '@/server/lib/service/eventService'; // サービスをインポート
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import styles from './CreateEvent.module.css'; // CSSモジュールをインポート
import { auth } from '@/server/auth/firebase';
import { toDateString } from '@/server/lib/utils/date';

const CreateEvent = () => {
  const router = useRouter();
  const user = auth.currentUser;
  const [eventDetails, setEventDetails] = useState({
    name: '',
    event_type: '',
    match_mode: '',
    host_name: '',
    players_number: 0,
    date: null,
    start_time: '',
    end_time: '',
    address: '',
    pre_registration_decklist: false,
    host_id: user?.uid || 'nobody',
    round_now: -1,
    players: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    await addEvent(eventDetails);
    router.push('/host/dashboard');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Event</h1>
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
        value={eventDetails.start_time}
        onChange={handleChange}
        required
      />
      <Input
        type="time"
        name="end_time"
        value={eventDetails.end_time}
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
      <Button onClick={handleSubmit}>Create Event</Button>
      <Button back>back</Button>
    </div>
  );
};

export default CreateEvent;
