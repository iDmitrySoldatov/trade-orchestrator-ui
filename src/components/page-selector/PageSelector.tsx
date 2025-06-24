import styles from './page-selector.module.css';
import { useEffect } from 'react';

interface ComponentProps {
  current: number;
  total: number;
  setCurrent: (current: number) => void;
}

const PageSelector = ({ current, total, setCurrent }: ComponentProps) => {
  useEffect(() => {
    if (current > total) {
      setCurrent(Math.max(0, total - 1));
    }
  }, [total]);

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < total) {
      setCurrent(current + 1);
    }
  };

  const handleFirst = () => {
    setCurrent(0);
  };

  const handleLast = () => {
    setCurrent(total - 1);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.arrow} ${current === 0 ? styles.disabled : ''}`}
        onClick={handleFirst}
        disabled={current === 0}
      >
        &laquo;
      </button>

      <button
        className={`${styles.arrow} ${current === 0 ? styles.disabled : ''}`}
        onClick={handlePrev}
        disabled={current === 0}
      >
        &larr;
      </button>

      <span className={styles.pageInfo}>
        {current + 1} / {total}
      </span>

      <button
        className={`${styles.arrow} ${current + 1 === total ? styles.disabled : ''}`}
        onClick={handleNext}
        disabled={current + 1 === total}
      >
        &rarr;
      </button>

      <button
        className={`${styles.arrow} ${current + 1 === total ? styles.disabled : ''}`}
        onClick={handleLast}
        disabled={current + 1 === total}
      >
        &raquo;
      </button>
    </div>
  );
};

export default PageSelector;
