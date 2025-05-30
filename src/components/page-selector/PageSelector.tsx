import styles from './page-selector.module.css';

interface ComponentProps {
  current: number;
  total: number;
  setCurrent: (current: number) => void;
}

const PageSelector = ({ current, total, setCurrent }: ComponentProps) => {
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

  return (
      <div className={styles.container}>
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
      </div>
  );
};

export default PageSelector;