import styles from './dropdown.module.css';

interface IOption {
  label: string;
  value: string;
}

interface IComponentProps {
  options: IOption[];
  selected: string | number | undefined;
  onChange: (value: string) => void;
}

const Dropdown = ({ options, selected, onChange }: IComponentProps) => {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className={styles.container}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
