import styles from './report-details.module.css';
import { useAppSelector } from '../../services/hooks.ts';

interface IParameter {
  name: string;
  value: string | number | boolean; // Явно указываем возможные типы
}

const ReportDetails = () => {
  const { currentReport } = useAppSelector((state) => state.backTests);

  const getProfitPercent = (profit: number) => {
    if (profit === null) return '0%';
    if (profit < 1) {
      return `-${((1 - profit) * 100).toFixed(2)}%`;
    } else if (profit === 1) {
      return '0%';
    } else {
      return `+${((profit - 1) * 100).toFixed(2)}%`;
    }
  };

  const getInterestPercent = (profit: number) => {
    if (profit < 0) {
      return `${profit.toFixed(2)}%`;
    } else if (profit === 0) {
      return '0%';
    } else {
      return `+${profit.toFixed(2)}%`;
    }
  };

  const parseParams = (): IParameter[] | null => {
    if (!currentReport?.params) return null;

    try {
      const params = JSON.parse(currentReport.params) as Record<
        string,
        unknown
      >;
      return Object.entries(params).map(([key, value]) => ({
        name: key.replace(/_/g, ' '),
        value: formatParamValue(value),
      }));
    } catch (e) {
      console.error('Error parsing parameters:', e);
      return null;
    }
  };

  const formatParamValue = (value: unknown): string | number => {
    if (typeof value === 'number') {
      return Number(value.toFixed(2));
    }
    if (typeof value === 'string') {
      return value;
    }
    return String(value);
  };

  if (!currentReport) return null;

  return (
    <div className={styles.container}>
      <div className={styles.chapter_container}>
        <h2>Общая информация</h2>
        <div className={styles.record_container}>
          <div className={styles.record}>
            <p>Инструмент</p>
            <p>
              {currentReport.symbol.symbol} - {currentReport.symbol.exchange}
            </p>
          </div>

          <div className={styles.record}>
            <p>Стратегия</p>
            <p>{currentReport.strategyName}</p>
          </div>

          <div className={styles.record}>
            <p>Временной отрезок</p>
            <p>{currentReport.timeframe}</p>
          </div>

          <div className={styles.record}>
            <p>Период</p>
            <p>{currentReport.periodInMonths} месяцев</p>
          </div>
        </div>
      </div>

      <div className={styles.chapter_container}>
        <h2>Статистика торговли</h2>
        <div className={styles.record_container}>
          <div className={styles.record}>
            <p>Ежемесечный доход</p>
            <p
              className={
                currentReport.backTestStats.averageInterestPerMonth >= 0
                  ? styles.green
                  : styles.red
              }
            >
              {getInterestPercent(
                currentReport.backTestStats.averageInterestPerMonth
              )}
            </p>
          </div>

          <div className={styles.record}>
            <p>Фактор прибыли</p>
            <p
              className={
                currentReport.backTestStats.profitFactor >= 1
                  ? styles.green
                  : styles.red
              }
            >
              {getProfitPercent(currentReport.backTestStats.profitFactor)}
            </p>
          </div>

          <div className={styles.record}>
            <p>Средняя прибыль по сделке</p>
            <p>{currentReport.backTestStats.averageTradeProfit.toFixed(2)}₽</p>
          </div>

          <div className={styles.record}>
            <p>Всего сделок</p>
            <p>{currentReport.backTestStats.totalTrades}</p>
          </div>

          <div className={styles.record}>
            <p>Успешных сделок</p>
            <p>{currentReport.backTestStats.winRate.toFixed(2)}%</p>
          </div>

          <div className={styles.record}>
            <p>Общий баланс</p>
            <p>{currentReport.backTestStats.totalBalance.toFixed(2)}₽</p>
          </div>

          <div className={styles.record}>
            <p>Коэффициент Шарпа</p>
            <p>{currentReport.backTestStats.sharpeRatio.toFixed(4)}</p>
          </div>

          <div className={styles.record}>
            <p>Максимальная просадка, ₽</p>
            <p>{currentReport.backTestStats.maxDrawdown.toFixed(2)}₽</p>
          </div>

          <div className={styles.record}>
            <p>Максимальная просадка, %</p>
            <p>
              {currentReport.backTestStats.initialDrawdownInterest
                ? currentReport.backTestStats.initialDrawdownInterest.toFixed(
                    2
                  ) + '%'
                : ''}
            </p>
          </div>

          <div className={styles.record}>
            <p>Самая убыточная сделка</p>
            <p className={styles.red}>
              {currentReport.backTestStats.maxLossTrade.toFixed(2)}₽
            </p>
          </div>
        </div>
      </div>

      <div className={styles.chapter_container}>
        <h2>Параметры</h2>
        <div className={styles.record_container}>
          {parseParams()?.map((param, index) => (
            <div key={index} className={styles.record}>
              <p>{param.name}</p>
              <p>{param.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
