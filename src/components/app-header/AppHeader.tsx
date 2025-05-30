import { Link } from 'react-router-dom';
import styles from './app-header.module.css';
import { useAppDispatch, useAppSelector } from '../../services/hooks.ts';
import { fetchLogout } from '../../slices/userSlice.ts';
import burgerImg from '../../images/burger.png';
import { useEffect, useRef, useState } from 'react';

const AppHeader = () => {
  const { isLoggedIn, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleBurgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onLogoutClick = () => {
    dispatch(fetchLogout());
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/instrument">Инструмент</Link>
        <Link to="/backTests">Бэктесты</Link>
      </nav>

      <button
        className={styles.burger}
        aria-label="Меню"
        onClick={handleBurgerClick}
        ref={burgerRef}
      >
        <img src={burgerImg} alt="Меню" />
      </button>

      {isMenuOpen && (
        <div ref={menuRef} className={styles.mobile_menu}>
          <Link
            to="/instrument"
            className={styles.mobile_link}
            onClick={() => setIsMenuOpen(false)}
          >
            Инструмент
          </Link>
          <Link
            to="/backTests"
            className={styles.mobile_link}
            onClick={() => setIsMenuOpen(false)}
          >
            Бэктесты
          </Link>
        </div>
      )}

      <div>
        {isLoggedIn && (
          <div className={styles.flexbox}>
            <p>{user.phone}</p>
            <button onClick={onLogoutClick} className={styles.button}>
              Выйти
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
