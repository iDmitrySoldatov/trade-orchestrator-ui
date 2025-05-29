import styles from './instrument-form.module.css';
import {useState} from "react";
import {Exchange} from "../../utils/types.ts";
import InactiveButton from "../buttons/inactive-button/InactiveButton.tsx";
import ActiveButton from "../buttons/active-button/ActiveButton.tsx";
import {EXCHANGES} from "../../utils/constants.ts";
import {useAppDispatch, useAppSelector} from "../../services/hooks.ts";
import {instrumentSlice} from "../../slices/instrumentSlice.ts";

interface ComponentProps {
  onSubmit: (exchange:Exchange, symbol:string) => void;
  onClose: () => void;
}

const InstrumentForm = ({onSubmit, onClose}:ComponentProps) => {
  const [symbol, setSymbol] = useState('');
  const [exchange, setExchange] = useState<Exchange>('MOEX');

  const { error } = useAppSelector(state => state.instrument);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (symbol.length < 1) {
      dispatch(instrumentSlice.actions.setError("Тикер не может быть пустым!"));
    } else {
      onSubmit(exchange, symbol);
    }
  }

  const handleClose = () => {
    setSymbol('');
    setExchange('MOEX');
    onClose();
  }

  return (
      <div className={styles.container}>
        <h1>Добавить инструмент</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.flexbox}>
            <div>
              <label htmlFor="">Биржа</label>
              <select value={exchange} onChange={(e) => setExchange(e.target.value as Exchange)}>
                {EXCHANGES.map((current, index) => <option
                    value={current} key={index} selected={exchange === current}>{current}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="">Тикер</label>
              <input
                  id='symbol-input'
                  type='text'
                  value={symbol}
                  title={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
              />
            </div>

            <p className={styles.error}>{error}</p>
          </div>

          <div className={styles.buttons_container}>
            <InactiveButton onClick={handleClose}>Отмена</InactiveButton>
            <ActiveButton type='submit'>Сохранить</ActiveButton>
          </div>
        </form>
      </div>
);
};

export default InstrumentForm;