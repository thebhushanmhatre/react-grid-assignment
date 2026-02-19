export const DepartmentCR = ({
  value,
  setGroupBy,
  setFilterOnValue,
}: {
  value: string;
  setGroupBy: (value: string) => void;
  setFilterOnValue: (value: string) => void;
}) => {
  const handleClick = () => {
    setGroupBy('department');
    setFilterOnValue(value);
  };

  return (
    <span role="button" onClick={handleClick} style={{ cursor: 'pointer' }}>
      {value}
    </span>
  );
};

// Creating this Department Cell Renderer for demonstration
