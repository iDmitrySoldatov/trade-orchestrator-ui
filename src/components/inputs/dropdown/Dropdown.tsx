import styles from './dropdown.module.css';

interface IComponentProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

const Dropdown = ({options, selected, onChange}:IComponentProps) => {
  return (
      <div className={styles.container}>
        <select
            value={selected}
            onChange={(e) => onChange(e.target.value)}
            className="filter-select"
        >
          {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
          ))}
        </select>
      </div>
  );
};

export default Dropdown;