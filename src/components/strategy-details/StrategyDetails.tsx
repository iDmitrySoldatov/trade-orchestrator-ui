import styles from './strategy-details.module.css';
import { useAppDispatch, useAppSelector } from '../../services/hooks.ts';
import ActiveButton from '../buttons/active-button/ActiveButton.tsx';
import {
  pauseStrategy,
  recoveryStrategy,
  stopStrategy,
} from '../../services/strategyService.ts';
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
      return `${profit.toFixed(2)}₽`;
    } else {
      return `+${profit.toFixed(2)}₽`;
    }
  };

  const handleClose = () => {
    dispatch(strategySlice.actions.setShowDetails(false));
  };

  const handleStop = () => {
    if (!currentStrategy) return null;
    stopStrategy(currentStrategy.id).then(() => handleClose());
  };

  const handlePause = () => {
    if (!currentStrategy) return null;
    pauseStrategy(currentStrategy.id).then(() => handleClose());
  };
  const handleRecovery = () => {
    if (!currentStrategy) return null;
    recoveryStrategy(currentStrategy.id).then(() => handleClose());
  };

  useEffect(() => {
    if (currentStrategy) {
      dispatch(fetchOrders(currentStrategy.id));
      dispatch(fetchEvents(currentStrategy.id));
    }

    const intervalId = setInterval(() => {
      if (currentStrategy) {
        dispatch(fetchOrders(currentStrategy.id));
        dispatch(fetchEvents(currentStrategy.id));
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
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
            <p>Stop loss</p>
            <p>{currentStrategy.stopLossCoefficient}</p>
          </div>

          <div className={styles.record}>
            <p>Take profit</p>
            <p>{currentStrategy.takeProfitCoefficient}</p>
          </div>

          <div className={styles.record}>
            <p>Отвечает на запросы</p>
            <p>{currentStrategy.isResponsible ? 'Да' : 'Нет'}</p>
          </div>
        </div>
      </div>

      <div className={styles.chapter_container}>
        <DropDownItem label="Сделки">
          {orders.length === 0 ? (
            <p>Заказов пока нет</p>
          ) : (
            orders.map((order, index) => (
              <div className={styles.order_container} key={index}>
                <p className={styles.id}>{order.guid}</p>

                <div className={styles.record_container}>
                  <div className={styles.record}>
                    <p>Последнее обновление</p>
                    <p>{new Date(order.updatedAt + 'Z').toLocaleString()}</p>
                  </div>

                  <div className={styles.record}>
                    <p>Комиссия</p>
                    <p>
                      {(order.openCommission + order.closeCommission).toFixed(
                        2
                      )}
                      ₽
                    </p>
                  </div>

                  <div className={styles.record}>
                    <p>Open price</p>
                    <p>{order.openPrice}</p>
                  </div>

                  <div className={styles.record}>
                    <p>Close price</p>
                    <p>{order.closePrice}</p>
                  </div>

                  <div className={styles.record}>
                    <p>Take profit</p>
                    <p>{order.takeProfit}</p>
                  </div>

                  <div className={styles.record}>
                    <p>Stop loss</p>
                    <p>{order.stopLoss}</p>
                  </div>

                  <div className={styles.record}>
                    <p>Result</p>
                    <p>{order.result}</p>
                  </div>

                  <div className={styles.record}>
                    <p>Операция</p>
                    <p>{order.orderSide.toUpperCase()}</p>
                  </div>
                </div>
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
                <p>{new Date(event.createdAt + 'Z').toLocaleString()}</p>
                <span className={event.eventType === 'ERROR' ? styles.red : ''}>
                  {event.eventType}
                </span>
                <span> - {event.message}</span>
              </div>
            ))
          )}
        </DropDownItem>
      </div>

      <div className={styles.buttons_container}>
        <ActiveButton onClick={handleStop} color="red">
          Остановить стратегию
        </ActiveButton>

        <ActiveButton onClick={handlePause}>Пауза</ActiveButton>

        <ActiveButton onClick={handleRecovery}>Возобновить</ActiveButton>
      </div>
    </div>
  );
};

export default StrategyDetails;
