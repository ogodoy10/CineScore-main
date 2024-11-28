import React from 'react';
import styles from './Alert.module.css';

const Alert = ({ message, onClose }) => {
    return (
        <div className={styles.alertOverlay}>
            <div className={styles.alertContent}>
                <p>{message}</p>
                <button onClick={onClose} className={styles.closeButton}>Fechar</button>
            </div>
        </div>
    );
};

export default Alert;