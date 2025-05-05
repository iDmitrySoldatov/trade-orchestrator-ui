import styles from './inactive-button.module.css';

interface ComponentProps {
  onClick: () => void;
  children: React.ReactNode;
}

const InactiveButton = ({onClick, children}:ComponentProps) => {
  return (
      <button onClick={onClick} className={styles.button}>
        {children}
      </button>
  );
};

export default InactiveButton;