import styles from './input-number.module.css';
import {useEffect, useState} from "react";

interface IComponentProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const InputNumber = ({value, onChange, min=1, max=240}:IComponentProps) => {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value])

  const handleBlur = () => {
    let numValue = parseInt(inputValue, 10);

    if (isNaN(numValue)) {
      numValue = min;
    } else if (numValue < min) {
      numValue = min;
    } else if (numValue > max) {
      numValue = max;
    }

    setInputValue(numValue.toString());
    onChange(numValue);
  };

  return (
      <div className={styles.container}>
        <input
            type="number"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onBlur={handleBlur}
            min={min}
            max={max}
            className={styles.input}
        />
      </div>
  );
};

export default InputNumber;