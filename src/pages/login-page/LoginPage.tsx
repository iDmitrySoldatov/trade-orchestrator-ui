import styles from './login-page.module.css';
import { fetchLogin } from '../../slices/userSlice.ts';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks.ts';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import ActiveButton from '../../components/buttons/active-button/ActiveButton.tsx';

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const { error, isLoggedIn } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let formatedPhone = '';
    if (phone.length === 11 && phone[0] === '8') {
      formatedPhone = '+7' + phone.slice(1);
    } else {
      formatedPhone = phone;
    }

    dispatch(fetchLogin({ phone: formatedPhone, token: token })).then(() => {
      setPhone('');
      setToken('');
      navigate(from ? from : '/instrument');
    });
  };

  if (isLoggedIn) {
    return <Navigate to="/instrument" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Вход</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.flexbox}>
            <div>
              <label htmlFor="phone-input">Телефон</label>
              <input
                id="phone-input"
                type="text"
                value={phone}
                title={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="token-input">Токен</label>
              <input
                id="token-input"
                type="text"
                value={token}
                title={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.button_container}>
              <ActiveButton type="submit">Войти</ActiveButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
