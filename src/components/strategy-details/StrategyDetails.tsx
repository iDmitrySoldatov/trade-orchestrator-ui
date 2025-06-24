import styles from './strategy-details.module.css';
import { useAppDispatch, useAppSelector } from '../../services/hooks.ts';
import ActiveButton from '../buttons/active-button/ActiveButton.tsx';
import { stopStrategy } from '../../services/strategyService.ts';
import {
  fetchEvents,
  fetchOrders,
  strategySlice,
} from '../../slices/strategySlice.ts';
import DropDownItem from '../drop-down-item/DropDownItem.tsx';
import { useEffect } from 'react';

const StrategyDetails = () => {
  const dispatch = useAppDispatch();
  const { currentStrategy, orders, events } = useAppSelector(
    (state) => state.strategy
  );

  const getProfit = (profit: number) => {
    if (profit <= 0) {
      return `${profit.toFixed(2)}`;
    } else {
      return `+${profit.toFixed(2)}%`;
    }
  };

  const handleClose = () => {
    dispatch(strategySlice.actions.setShowDetails(false));
  };

  const handleStop = () => {
    if (!currentStrategy) return null;
    stopStrategy(currentStrategy.id).then(() => handleClose());
  };

  useEffect(() => {
    if (currentStrategy) {
      dispatch(fetchOrders(currentStrategy.id));
      dispatch(fetchEvents(currentStrategy.id));
    }
  }, [currentStrategy]);

  if (!currentStrategy) return null;

  return (
    <div className={styles.container}>
      <div className={styles.chapter_container}>
        <h2>Общая информация</h2>
        <div className={styles.record_container}>
          <div className={styles.record}>
            <p>Инструмент</p>
            <p>
              {currentStrategy.instrument.symbol} -{' '}
              {currentStrategy.instrument.exchange}
            </p>
          </div>

          <div className={styles.record}>
            <p>Прибыль</p>
            <p
              className={
                currentStrategy.profit >= 0 ? styles.green : styles.red
              }
            >
              {getProfit(currentStrategy.profit)}
            </p>
          </div>

          <div className={styles.record}>
            <p>Стратегия</p>
            <p>{currentStrategy.strategyName}</p>
          </div>

          <div className={styles.record}>
            <p>Временной отрезок</p>
            <p>{currentStrategy.timeframe}</p>
          </div>

          <div className={styles.record}>
            <p>Размер лота</p>
            <p>{currentStrategy.lotQuantity}</p>
          </div>

          <div className={styles.record}>
            <p>Состояние</p>
            <p>{currentStrategy.state}</p>
          </div>

          <div className={styles.record}>
            <p>Отвечает на запросы</p>
            <p>{currentStrategy.isResponsible ? 'Да' : 'Нет'}</p>
          </div>
        </div>
      </div>

      <div className={styles.chapter_container}>
        <DropDownItem label="Заказы">
          {orders.length === 0 ? (
            <p>Заказов пока нет</p>
          ) : (
            orders.map((order, index) => (
              <div key={index} className={styles.order_container}>
                <p>{new Date(order.updatedAt).toLocaleDateString()}</p>
                <p>Цена: {order.price}</p>
                <p>Take profit: {order.takeProfit}</p>
                <p>Stop loss: {order.stopLoss}</p>
                <p>Статус: {order.state}</p>
                <p>Результат: {order.result}</p>
              </div>
            ))
          )}
        </DropDownItem>
      </div>

      <div className={styles.chapter_container}>
        <DropDownItem label="События">
          {events.length === 0 ? (
            <p>Событий пока нет</p>
          ) : (
            events.map((event, index) => (
              <div key={index} className={styles.event_container}>
                <p>{new Date(event.createdAt).toLocaleString()}</p>
                <p>
                  {event.eventType} {event.message}
                </p>
              </div>
            ))
          )}
        </DropDownItem>
      </div>

      <div className={styles.buttons_container}>
        <ActiveButton onClick={handleStop}>Остановить стратегию</ActiveButton>
      </div>
    </div>
  );
};

export default StrategyDetails;
