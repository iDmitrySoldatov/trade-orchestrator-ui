import styles from './active-button.module.css';

interface ComponentProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'submit' | 'reset';
}

const ActiveButton = ({onClick, children, type}:ComponentProps) => {
  return (
      <button type={type} onClick={onClick} className={styles.button}>
        {children}
      </button>
  );
};

export default ActiveButton;