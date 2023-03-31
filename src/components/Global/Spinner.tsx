import React, { useEffect } from 'react';
import styles from '../../styles/Global.module.css';

type SpinnerProps = {
  color?: string
}

const Spinner: React.FC<SpinnerProps> = ({ color = "#ffffff" }) => {
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--color', color)
  }, [color])

  return <div className={styles.spinner} />
}

export default Spinner;