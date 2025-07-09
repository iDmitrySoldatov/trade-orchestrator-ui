import styles from './profile-page.module.css';
import AppHeader from '../../components/app-header/AppHeader.tsx';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks.ts';
import {
  fetchCheck,
  fetchDeleteChatId,
  fetchSetChatId,
} from '../../slices/userSlice.ts';
import InactiveButton from '../../components/buttons/inactive-button/InactiveButton.tsx';
import ActiveButton from '../../components/buttons/active-button/ActiveButton.tsx';

const ProfilePage = () => {
  const [id, setId] = useState<string>('');

  const dispatch = useAppDispatch();

  const { user, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.chatId != null) {
      setId(user.chatId);
    } else {
      setId('');
    }
  }, [user.chatId]);

  useEffect(() => {
    dispatch(fetchCheck());
  }, []);

  const handleApply = () => {
    dispatch(fetchSetChatId(id)).then(() => dispatch(fetchCheck()));
  };

  const handleDelete = () => {
    dispatch(fetchDeleteChatId()).then(() => dispatch(fetchCheck()));
  };

  const getProfit = (profit: number) => {
    if (profit <= 0) {
      return `${profit.toFixed(2)}₽`;
    } else {
      return `+${profit.toFixed(2)}₽`;
    }
  };

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <div className={styles.content_container}>
          <div>
            <p>Ваш код чата в телеграм: </p>
            <div className={styles.flex_row}>
              <input
                className={styles.chat_id}
                type="text"
                value={id}
                title={id}
                onChange={(e) => setId(e.target.value)}
              />
              {user.chatId === id ? (
                <InactiveButton onClick={() => {}}>Применить</InactiveButton>
              ) : (
                <ActiveButton onClick={handleApply}>Применить</ActiveButton>
              )}
              {user.chatId === null || user.chatId === '' ? (
                <InactiveButton onClick={() => {}}>Удалить</InactiveButton>
              ) : (
                <ActiveButton onClick={handleDelete}>Удалить</ActiveButton>
              )}
            </div>
            <p className={styles.red}>{error}</p>
          </div>

          <div>
            <p>Общая прибыль за всё время:</p>
            <p className={user.profit >= 0 ? styles.green : styles.red}>
              {getProfit(user.profit)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
