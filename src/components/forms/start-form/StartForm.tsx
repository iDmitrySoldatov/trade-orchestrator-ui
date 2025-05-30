import styles from './start-form.module.css';
import Dropdown from "../../inputs/dropdown/Dropdown.tsx";
import {useState} from "react";
import InstrumentCheckboxGroup from "../../inputs/instrument-checkbox-group/InstrumentCheckboxGroup.tsx";
import {useAppDispatch, useAppSelector} from "../../../services/hooks.ts";
import {STRATEGY_NAMES} from "../../../utils/constants.ts";
import CheckboxGroup from "../../inputs/checkbox-group/CheckboxGroup.tsx";
import InputNumber from "../../inputs/input-number/InputNumber.tsx";
import InputFloat from "../../inputs/input-float/InputFloat.tsx";
import ActiveButton from "../../buttons/active-button/ActiveButton.tsx";
import InactiveButton from "../../buttons/inactive-button/InactiveButton.tsx";
import {backTestsSlice} from "../../../slices/backTestsSlice.ts";
import {startBackTest} from "../../../services/backTestsService.ts";

const StartForm = () => {
  const [strategyName, setStrategyName] = useState<string>(STRATEGY_NAMES[0]);
  const [selectedInstrumentIds, setSelectedInstrumentIds] = useState<number[]>([]);
  const [selectedTimeframes, setSelectedTimeframes] = useState<string[]>([]);
  const [period, setPeriod] = useState<number>(1);

  const dispatch = useAppDispatch();

  const { items } = useAppSelector(state => state.instrument);
  const { timeframes, backTestParams} = useAppSelector(state => state.enum);

  const [params, setParams] = useState<Record<string, string>>(() => {
    const initialParams: Record<string, string> = {};
    backTestParams?.forEach(param => {
      initialParams[param] = '';
    });
    return initialParams;
  });

  // Обработчик изменения параметра
  const handleParamChange = (paramName: string) => (value: string) => {
    setParams(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  // Форматирование названия параметра для отображения
  const formatParamName = (name: string) => {
    return name
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
  };

  const getParamsString = () => {
    const filteredParams: Record<string, string> = {};

    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && backTestParams?.includes(key) && params[key] !== '') {
        filteredParams[key] = params[key];
      }
    });

    return filteredParams
  };

  const handleClose = () => {
    dispatch(backTestsSlice.actions.setShowStart(false));
  }

  const handleSubmit = () => {
    const paramsString = getParamsString();
    startBackTest({strategyName: strategyName, symbols: selectedInstrumentIds,
      timeframes: selectedTimeframes, periodInMonth: period, params: paramsString}).then(() => handleClose());
  };

  return (
      <div className={styles.container}>
        <h1>Запустить тест</h1>

        <div className={styles.flexrow}>
          <div className={styles.flexrow}>
            <h3>Стратегия</h3>
            <Dropdown
                options={STRATEGY_NAMES.map(current => current)}
                selected={strategyName}
                onChange={setStrategyName}
            />
          </div>

          <div className={styles.flexrow}>
            <h3>Период (месяцы)</h3>
            <InputNumber
                value={period}
                onChange={setPeriod}
                min={1}
                max={24}
            />
          </div>
        </div>

        <div>
          <h3>Инструменты</h3>
          <InstrumentCheckboxGroup
              instruments={items}
              selectedIds={selectedInstrumentIds}
              onChange={setSelectedInstrumentIds}
          />
        </div>

        <div>
          <h3>Временные отрезки</h3>
          <CheckboxGroup
              options={timeframes}
              selected={selectedTimeframes}
              onChange={setSelectedTimeframes}
          />
        </div>

        {backTestParams && backTestParams.length > 0 && (
            <div className={styles.params_container}>
              <h3>Параметры стратегии</h3>
              <div>
                {backTestParams.map(param => (
                    <div key={param} className={styles.param}>
                      <h4 >
                        {formatParamName(param)}
                      </h4>
                      <InputFloat
                          value={params[param] || ''}
                          onChange={handleParamChange(param)}
                      />
                    </div>
                ))}
              </div>
            </div>
        )}

        <div className={styles.buttons_contaier}>

          <InactiveButton onClick={handleClose}>Отмена</InactiveButton>

          <ActiveButton onClick={handleSubmit}>
            Запустить тест
          </ActiveButton>
        </div>


      </div>
  );
};

export default StartForm;