import styles from './instrument-checkbox-group.module.css';
import {IInstrument} from "../../../utils/types.ts";

interface IComponentProps {
  instruments: IInstrument[];
  selectedIds: number[];
  onChange: (selectedIds: number[]) => void;
}

const InstrumentCheckboxGroup = ({instruments, selectedIds, onChange}:IComponentProps) => {
  const handleCheckboxChange = (instrumentId: number) => {
    const newSelectedIds = selectedIds.includes(instrumentId)
        ? selectedIds.filter(id => id !== instrumentId)
        : [...selectedIds, instrumentId];
    onChange(newSelectedIds);
  };

  return (
      <div className={styles.container}>
        {instruments.map(instrument => (
            <label key={instrument.id} className="instrument-checkbox-label">
              <input
                  type="checkbox"
                  checked={selectedIds.includes(instrument.id)}
                  onChange={() => handleCheckboxChange(instrument.id)}
              />
              {`${instrument.symbol} - ${instrument.exchange}`}
            </label>
        ))}
      </div>
  );
};

export default InstrumentCheckboxGroup;