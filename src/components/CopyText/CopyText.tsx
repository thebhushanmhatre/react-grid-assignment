import './CopyText.styles.css';

export const CopyText = ({ value }: { value: string }) => {
  const copyTextValue = () => {
    if (window.navigator) {
      window.navigator.clipboard.writeText(value);
      // Add a user response to inform that text has been copied
      // For now just adding styles on hover and active
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copyTextValue();
    }
  };

  return (
    <span
      className="copy-text-field"
      onClick={copyTextValue}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      title="Copy to clipboard"
    >
      {value}
      <span className="copy-text-icon">📋</span>
    </span>
  );
};

// TODO: This and Tag component can be combined into a single component
