import styles from './start-strategy-form.module.css';
import Dropdown from '../../inputs/dropdown/Dropdown.tsx';
import { STRATEGY_NAMES } from '../../../utils/constants.ts';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../services/hooks.ts';
import InputFloat from '../../inputs/input-float/InputFloat.tsx';
import InactiveButton from '../../buttons/inactive-button/InactiveButton.tsx';
import ActiveButton from '../../buttons/active-button/ActiveButton.tsx';
import { strategySlice } from '../../../slices/strategySlice.ts';
import { startStrategy } from '../../../services/strategyService.ts';
import InputNumber from '../../inputs/input-number/InputNumber.tsx';
import { fetchGetTimeframes } from '../../../slices/enumSlice.ts';

const StartStrategyForm = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.instrument);
  const { timeframes } = useAppSelector((state) => state.enum);
  const [strategyName, setStrategyName] = useState<string>(STRATEGY_NAMES[0]);

  const [selectedInstrumentId, setSelectedInstrumentId] = useState<number>(
    items[0].id
  );
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>(
    timeframes[0]
  );
  const [lotQuantity, setLotQuantity] = useState<number>(1);
  const [takeProfit, setTakeProfit] = useState<string>('');
  const [stopLoss, setStopLoss] = useState<string>('');

  const handleSelectInstrumentChange = (instrumentId: string) => {
    setSelectedInstrumentId(+instrumentId);
  };

  const handleClose = () => {
    dispatch(strategySlice.actions.setShowStart(false));
  };

  const handleSubmit = () => {
    startStrategy({
      strategyName: strategyName,
      symbol: selectedInstrumentId || 0,
      timeframe: selectedTimeframe,
      lotQuantity: lotQuantity,
      stopLossCoefficient: +stopLoss,
      takeProfitCoefficient: +takeProfit,
    }).then(() => handleClose());
  };

  useEffect(() => {
    if (timeframes.length < 0) {
      dispatch(fetchGetTimeframes()).then(() =>
        setSelectedTimeframe(timeframes[0])
      );
    }
  }, [timeframes]);

  return (
    <div className={styles.container}>
      <h1>Запустить стратегию</h1>

      <div className={styles.flexrow}>
        <div className={styles.flexrow}>
          <h3>Стратегия</h3>
          <Dropdown
            options={STRATEGY_NAMES.map((current) => {
              return { label: current, value: current };
            })}
            selected={strategyName}
            onChange={setStrategyName}
          />
        </div>

        <div className={styles.flexrow}>
          <h3>Инструмент</h3>
          <Dropdown
            options={items.map((current) => {
              return {
                label: `${current.symbol} - ${current.exchange}`,
                value: current.id.toString(),
              };
            })}
            selected={selectedInstrumentId}
            onChange={handleSelectInstrumentChange}
          />
        </div>
      </div>

      <div className={styles.flexrow}>
        <div className={styles.flexrow}>
          <h3>Временной отрезок</h3>
          <Dropdown
            options={timeframes.map((current) => {
              return { label: current, value: current };
            })}
            selected={selectedTimeframe}
            onChange={setSelectedTimeframe}
          />
        </div>

        <div className={styles.flexrow}>
          <h3>Количество лотов</h3>
          <InputNumber value={lotQuantity} onChange={setLotQuantity} />
        </div>
      </div>

      <div className={styles.params_container}>
        <div className={styles.flexrow}>
          <h3>Take profit коэффициент</h3>
          <InputFloat value={takeProfit} onChange={setTakeProfit} />
        </div>

        <div className={styles.flexrow}>
          <h3>Stop loss коэффициент</h3>
          <InputFloat value={stopLoss} onChange={setStopLoss} />
        </div>
      </div>

      <div className={styles.buttons_container}>
        <InactiveButton onClick={handleClose}>Отмена</InactiveButton>

        <ActiveButton onClick={handleSubmit}>Запустить Стратегию</ActiveButton>
      </div>
    </div>
  );
};

export default StartStrategyForm;
