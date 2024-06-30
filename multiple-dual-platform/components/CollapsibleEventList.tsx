import { useState } from 'react';
import styles from './CollapsibleEventList.module.css';

interface CollapsibleEventListProps {
  title: string;
  events: any[];
}

const CollapsibleEventList: React.FC<CollapsibleEventListProps> = ({ title, events }) => {
  const [isOpen, setIsOpen] = useState(title !== "Completed" && title !== "Canceled");

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={toggleOpen}>
        <h2>{title}</h2>
        <button className={styles.button}>{isOpen ? 'Hide' : 'Show'}</button>
      </div>
      {isOpen && (
        <ul className={styles.eventList}>
          {events.map((event) => (
            <li key={event.id} className={styles.eventItem}>
              <a href={`/host/event/${event.id}`}>{event.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CollapsibleEventList;
