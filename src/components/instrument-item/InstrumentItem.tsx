import styles from './instrument-item.module.css';
import { IInstrument } from '../../utils/types.ts';

interface ComponentProps {
  data: IInstrument;
}

const InstrumentItem = ({ data }: ComponentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <p>{data.shortname}</p>
        <p className={styles.second}>{data.symbol}</p>
      </div>

      <p className={styles.exchange}>{data.exchange}</p>

      <p className={styles.step}>{data.lotSize}</p>

      <p className={styles.price}>
        {data.pointPrice} {data.currency}
      </p>
    </div>
  );
};

export default InstrumentItem;
