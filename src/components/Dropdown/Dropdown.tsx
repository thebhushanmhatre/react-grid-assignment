import './Dropdown.styles.css';
import { extractHeader } from '../../utilities';

type DropdownPropsType = {
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  defaultOptionText?: string;
  disabled?: boolean;
};

export const Dropdown = ({
  value,
  options,
  onChange,
  label,
  defaultOptionText = 'Select from values below',
  disabled,
}: DropdownPropsType) => {
  const labelId = label.replaceAll(' ', '-');
  return (
    <div className="dropdown-container">
      <label htmlFor={labelId}>{label}</label>
      <select
        id={labelId}
        onChange={onChange}
        className="dropdown-select"
        autoFocus={true}
        value={value}
        disabled={disabled}
      >
        <option key={''} value={''} disabled className="dropdown-option">
          {defaultOptionText}
        </option>
        {options?.length > 0 &&
          options.map((option) => (
            <option key={option} value={option} className="dropdown-option">
              {extractHeader(option)}
            </option>
          ))}
      </select>
    </div>
  );
};
