import styles from './modal-overlay.module.css';

interface ComponentProps {
  onMouseDown: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
}

const ModalOverlay = ({children, onMouseDown, onMouseUp}:ComponentProps) => {
  return (
      <div
          className={styles.container}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          id='modal-overlay'
      >
        {children}
      </div>
  );
};

export default ModalOverlay;