import styles from './modal.module.css';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/ModalOverlay.tsx';
import close from '../../images/close.png';

interface ComponentProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ComponentProps) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement>();

  const [isMouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const root = document.getElementById('modal-root');
    if (!root) {
      const div = document.createElement('div');
      div.id = 'modal-root';
      document.body.appendChild(div);
      setModalRoot(div);
    } else {
      setModalRoot(root);
    }
  }, []);

  useEffect(() => {
    const escapePressHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', escapePressHandler);
    return () => {
      document.removeEventListener('keydown', escapePressHandler);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.id === 'modal-overlay') {
      setMouseDown(true);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!isMouseDown) return;
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.id === 'modal-overlay') {
      onClose();
      setMouseDown(false);
    }
  };

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalOverlay onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <div className={styles.container}>
        <div className={styles.close} onClick={onClose}>
          <img src={close} alt="Close" draggable={false} />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
