import styles from './checkbox-group.module.css';

interface IComponentProps {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}

const CheckboxGroup = ({options, selected, onChange}:IComponentProps) => {
  const handleCheckboxChange = (option: string) => {
    const newSelected = selected.includes(option)
        ? selected.filter(item => item !== option)
        : [...selected, option];
    onChange(newSelected);
  };

  return (
      <div className={styles.container}>
        {options.map((option) => (
            <label key={option} className="checkbox-label">
              <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
        ))}
      </div>
  );
};

export default CheckboxGroup;