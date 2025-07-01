import styles from './strategy-item.module.css';
import { IStrategy } from '../../utils/types.ts';

interface ComponentProps {
  data: IStrategy;
  onClick: (strategy: IStrategy) => void;
}

const StrategyItem = ({ data, onClick }: ComponentProps) => {
  const getProfit = (profit: number) => {
    if (profit <= 0) {
      return `${profit.toFixed(2)}₽`;
    } else {
      return `+${profit.toFixed(2)}₽`;
    }
  };

  return (
    <div className={styles.container} onClick={() => onClick(data)}>
      <p className={styles.id_container}>#{data.id}</p>
      <div className={styles.flexrow}>
        <p>{data.strategyName}</p>
        <p className={data.isResponsible ? styles.green : styles.red}>
          {data.state}
        </p>
      </div>

      <div className={styles.flexrow}>
        <p>
          {data.instrument.symbol} - {data.instrument.exchange}
        </p>
        <p className={data.profit >= 0 ? styles.green : styles.red}>
          {getProfit(data.profit)}
        </p>
      </div>
    </div>
  );
};

export default StrategyItem;
