import styles from './drop-down-item.module.css';
import { useState } from 'react';
import arrowImg from '../../images/arrow.png';

interface ComponentProps {
  label: string;
  children: React.ReactNode;
}

const DropDownItem = ({ label, children }: ComponentProps) => {
  const [isOpened, setOpened] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p
          onClick={() => {
            setOpened(!isOpened);
          }}
        >
          {label}
        </p>
        <img
          src={arrowImg}
          alt="раскрыть меню"
          className={styles.arrow}
          onClick={() => {
            setOpened(!isOpened);
          }}
        />
      </div>

      {isOpened && <div>{children}</div>}
    </div>
  );
};

export default DropDownItem;
