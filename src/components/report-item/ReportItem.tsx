import styles from './report-item.module.css';
import { IReport } from '../../utils/types.ts';

interface ComponentProps {
  data: IReport;
  onClick: (report: IReport) => void;
}

const ReportItem = ({ data, onClick }: ComponentProps) => {
  const getPercent = (profit: number) => {
    if (profit < 0) {
      return `${profit.toFixed(2)}%`;
    } else if (profit === 0) {
      return '0%';
    } else {
      return `+${profit.toFixed(2)}%`;
    }
  };

  return (
    <div className={styles.container} onClick={() => onClick(data)}>
      <div className={styles.header}>
        <h2>
          {data.symbol.symbol} - {data.symbol.exchange}
        </h2>
        <p
          className={
            data.backTestStats.averageInterestPerMonth >= 0
              ? styles.green
              : styles.red
          }
        >
          {getPercent(data.backTestStats.averageInterestPerMonth)}
        </p>
      </div>

      <div className={styles.flexrow}>
        <div>
          <p className={styles.second}>Всего сделок</p>
          <p>{data.backTestStats.totalTrades}</p>
        </div>
        <div>
          <p className={styles.second}>Успешных сделок</p>
          <p>{data.backTestStats.winRate.toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
};

export default ReportItem;
