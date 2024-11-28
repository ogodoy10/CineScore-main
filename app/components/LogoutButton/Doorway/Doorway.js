import React from 'react';
import styles from './Doorway.module.css';

const Doorway = () => {
  return (
    <svg className={styles.doorway} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M93.4 86.3H58.6c-1.9 0-3.4-1.5-3.4-3.4V17.1c0-1.9 1.5-3.4 3.4-3.4h34.8c1.9 0 3.4 1.5 3.4 3.4v65.8c0 1.9-1.5 3.4-3.4 3.4z" />
    </svg>
  );
};

export default Doorway;
