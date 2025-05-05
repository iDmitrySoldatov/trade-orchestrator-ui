import styles from './instrument-item.module.css';
import {IInstrument} from "../../utils/types.ts";
import deleteImg from '../../images/delete.png';

interface ComponentProps {
  data: IInstrument;
}

const InstrumentItem = ({data}: ComponentProps) => {

  const handleDelete = () => {
    console.log('delete');
  }

  return (
      <div className={styles.container}>
        <div className={styles.name}>
          <p>{data.shortname}</p>
          <p className={styles.second}>{data.symbol}</p>
        </div>

        <p className={styles.exchange}>{data.exchange}</p>

        <p className={styles.step}>{data.minStep}</p>

        <p className={styles.price}>{data.pointPrice} {data.currency}</p>

        <img src={deleteImg} alt="удалить" className={styles.delete} onClick={handleDelete}/>
      </div>
  );
};

export default InstrumentItem;