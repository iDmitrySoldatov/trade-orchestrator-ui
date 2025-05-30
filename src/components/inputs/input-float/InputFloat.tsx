import styles from './input-float.module.css';
import { useEffect, useState } from "react";

interface IComponentProps {
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
}

const InputFloat = ({ value, onChange, min = 0, max = 100 }: IComponentProps) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleBlur = () => {
    let numValue = parseFloat(inputValue);
    let result = inputValue;

    if (isNaN(numValue)) {
      result = '';
    } else if (numValue < min) {
      numValue = min;
      result = numValue.toString();
    } else if (numValue > max) {
      numValue = max;
      result = numValue.toString();
    }

    if (result[0] === '.') {
      result = '0' + result;
    }

    setInputValue(result);
    onChange(result);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (
        newValue === '' ||
        /^-?\d*\.?\d*$/.test(newValue) &&
        (min >= 0 ? !newValue.startsWith('-') : true) &&
        (newValue.match(/\./g) || []).length <= 1
    ) {
      setInputValue(newValue);
    }
  };

  return (
      <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
          inputMode="decimal"
      />
  );
};

export default InputFloat;