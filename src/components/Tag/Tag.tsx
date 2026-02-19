import './Tag.styles.css';

export const Tag = ({
  value,
  onClick,
}: {
  value: string;
  onClick: () => void;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <span
      className="tag"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {value}
    </span>
  );
};

// Improving accessibility by adding role, I am avoiding use of button to avoid having to rewrite styles
