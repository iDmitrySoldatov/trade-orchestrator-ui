import styles from './active-button.module.css';

interface ComponentProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'submit' | 'reset';
  color?: 'red';
}

const ActiveButton = ({ onClick, children, type, color }: ComponentProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${color === 'red' ? styles.red : ''}`}
    >
      {children}
    </button>
  );
};

export default ActiveButton;
