import styles from './filter-wall.module.css';
import { useAppDispatch, useAppSelector } from '../../services/hooks.ts';
import { STRATEGY_NAMES } from '../../utils/constants.ts';
import Dropdown from '../inputs/dropdown/Dropdown.tsx';
import { useEffect, useState } from 'react';
import InstrumentCheckboxGroup from '../inputs/instrument-checkbox-group/InstrumentCheckboxGroup.tsx';
import CheckboxGroup from '../inputs/checkbox-group/CheckboxGroup.tsx';
import InputNumber from '../inputs/input-number/InputNumber.tsx';
import { IBackTestsFilter, StrategyNames } from '../../utils/types.ts';
import { backTestsSlice } from '../../slices/backTestsSlice.ts';

const FilterWall = () => {
  const dispatch = useAppDispatch();
  const { filter } = useAppSelector((state) => state.backTests);

  const [localFilter, setLocalFilter] = useState<IBackTestsFilter>(filter);

  const { items } = useAppSelector((state) => state.instrument);

  const { timeframes } = useAppSelector((state) => state.enum);

  const [strategyName, setStrategyName] = useState<string>(
    localFilter.strategyName
  );
  const [selectedInstrumentIds, setSelectedInstrumentIds] = useState<number[]>(
    localFilter.symbols
  );

  const [selectedTimeframes, setSelectedTimeframes] = useState<string[]>(
    localFilter.timeframes
  );

  const [isMy, setIsMy] = useState(localFilter.user);

  const [isLast, setIsLast] = useState(localFilter.last);

  const [minInterval, setMinInterval] = useState(localFilter.minPeriod);
  const [maxInterval, setMaxInterval] = useState(localFilter.maxPeriod);

  useEffect(() => {
    const newArr = [];

    items.forEach((current) => {
      newArr.push(current.symbol + ' - ' + current.exchange);
    });
  }, [items]);

  useEffect(() => {
    dispatch(
      backTestsSlice.actions.setFilter({
        ...localFilter,
        orderBy: filter.orderBy,
        page: filter.page,
      })
    );
  }, [localFilter]);

  const handleChangeStrategyName = (strategyName: string) => {
    setStrategyName(strategyName);
    setLocalFilter({
      ...localFilter,
      strategyName: strategyName as StrategyNames,
    });
  };

  const handleChangeSelectedInstrumentIds = (instrumentIds: number[]) => {
    setSelectedInstrumentIds(instrumentIds);
    setLocalFilter({ ...localFilter, symbols: instrumentIds });
  };

  const handleChangeSelectedTimeframes = (timeframes: string[]) => {
    setSelectedTimeframes(timeframes);
    setLocalFilter({ ...localFilter, timeframes: timeframes });
  };

  const handleChangeIsMy = (isMy: boolean) => {
    setIsMy(isMy);
    setLocalFilter({ ...localFilter, user: isMy });
  };

  const handleChangeIsLast = (isLast: boolean) => {
    setIsLast(isLast);
    setLocalFilter({ ...localFilter, last: isLast });
  };

  const handleChangeMinInterval = (minInterval: number) => {
    if (minInterval > maxInterval) {
      const newMax = minInterval;
      const newMin = maxInterval;
      setMinInterval(newMin);
      setMaxInterval(newMax);
      setLocalFilter({
        ...localFilter,
        minPeriod: newMin,
        maxPeriod: newMax,
      });
    } else {
      setMinInterval(minInterval);
      setLocalFilter({
        ...localFilter,
        minPeriod: minInterval,
      });
    }
  };

  const handleChangeMaxInterval = (maxInterval: number) => {
    if (maxInterval < minInterval) {
      const newMin = maxInterval;
      const newMax = minInterval;
      setMinInterval(newMin);
      setMaxInterval(newMax);
      setLocalFilter({
        ...localFilter,
        minPeriod: newMin,
        maxPeriod: newMax,
      });
    } else {
      setMaxInterval(maxInterval);
      setLocalFilter({
        ...localFilter,
        maxPeriod: maxInterval,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h3>Стратегия</h3>
        <Dropdown
          options={STRATEGY_NAMES.map((current) => current)}
          selected={strategyName}
          onChange={handleChangeStrategyName}
        />
      </div>

      <div>
        <h3>Инструмент</h3>
        <InstrumentCheckboxGroup
          instruments={items}
          selectedIds={selectedInstrumentIds}
          onChange={handleChangeSelectedInstrumentIds}
        />
      </div>

      <div>
        <h3>Временные отрезки</h3>
        <CheckboxGroup
          options={timeframes}
          selected={selectedTimeframes}
          onChange={handleChangeSelectedTimeframes}
        />
      </div>

      <div>
        <h3>Период</h3>

        <div className={styles.inline_flexbox}>
          <InputNumber value={minInterval} onChange={handleChangeMinInterval} />
          <InputNumber value={maxInterval} onChange={handleChangeMaxInterval} />
        </div>
      </div>

      <div className={styles.checkbox}>
        <label>
          <input
            type="checkbox"
            checked={isMy}
            onChange={() => handleChangeIsMy(!isMy)}
          />
          Только свои
        </label>
      </div>

      <div className={styles.checkbox}>
        <label>
          <input
            type="checkbox"
            checked={isLast}
            onChange={() => handleChangeIsLast(!isLast)}
          />
          Только последний
        </label>
      </div>
    </div>
  );
};

export default FilterWall;
