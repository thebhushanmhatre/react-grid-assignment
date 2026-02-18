import './Tag.styles.css';

export const Tag = ({
  value,
  onClick,
}: {
  value: string;
  onClick: () => void;
}) => {
  return (
    <span className="tag" onClick={onClick}>
      {value}
    </span>
  );
};
