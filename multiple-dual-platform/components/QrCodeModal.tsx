import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/Button';
import styles from './QrCodeModal.module.css';

interface QrCodeModalProps {
  eventId: string;
  onClose: () => void;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({ eventId, onClose }) => {
  const url = `${window.location.origin}/player/login?eventid=${eventId}`;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>QR Code for Event</h2>
        <QRCodeSVG value={url} size={256} />
        <p>Scan this QR code to join the event.</p>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

export default QrCodeModal;
