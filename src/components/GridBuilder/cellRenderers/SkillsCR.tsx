import { Tag } from '../../Tag';

export const SkillsCR = ({
  value,
  setGroupBy,
  setFilterOnValue,
}: {
  value: string[];
  setGroupBy: (value: string) => void;
  setFilterOnValue: (value: string) => void;
}) => {
  const handleClick = (skillValue: string) => {
    setGroupBy('skills');
    setFilterOnValue(skillValue);
  };

  return value.map((skill) => (
    <Tag key={skill} onClick={() => handleClick(skill)} value={skill} />
  ));
};

// Creating this Department Cell Renderer for demonstration
