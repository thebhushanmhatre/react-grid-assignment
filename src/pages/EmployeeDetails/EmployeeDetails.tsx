import './EmployeeDetails.styles.css';
import { Tag } from '../../components';
import { extractHeader } from '../../utilities';

import type { UserType } from '../../models/User';
export const EmployeeDetails = ({
  userDetails,
  setUserId,
  setGroupBy,
  setFilterOnValue,
  groupByKeys,
}: {
  userDetails: UserType;
  setUserId: (id: number | null) => void;
  setGroupBy: (val: string) => void;
  setFilterOnValue: (val: string) => void;
  groupByKeys: string[];
}) => {
  // Todos:
  // 1. Get userDetails from userData, instead getting it from props
  // 2. Manager name should show manager details
  // 3. This feature will require back button to navigate to previous page using history
  // 4. Email should be copyable (window.navigator.clipboard.writeText)
  // 5. Skills should be clickable - on Click should take you back to home page with skills filter applied - Done
  // 6. Same filter feature on Position and Department should be applied - Done

  const skipKeys = [
    'id',
    'firstName',
    'lastName',
    'isActive',
    'performanceRating',
    'salary',
  ];

  const onTagClick = (key: string, value: string) => {
    setGroupBy(key);
    setFilterOnValue(value);
    setUserId(null);
  };

  const renderUserDetails = () => {
    return (
      Object.entries(userDetails) as [
        keyof UserType,
        UserType[keyof UserType],
      ][]
    )
      .filter(([key]) => !skipKeys.includes(key))
      .map(([key, value]) => {
        const isTagType = groupByKeys.includes(key);

        if (isTagType) {
          return (
            <p key={key}>
              <strong>{extractHeader(key)}</strong>:{' '}
              {Array.isArray(value) ? (
                value.map((item) => (
                  <Tag
                    key={item}
                    value={item}
                    onClick={() => onTagClick(key, item)}
                  />
                ))
              ) : (
                <Tag
                  key={String(value)}
                  value={String(value)}
                  onClick={() => onTagClick(key, String(value))}
                />
              )}
            </p>
          );
        }

        return (
          <p key={key}>
            <strong>{extractHeader(key)}</strong>:{' '}
            {value ? String(value) : 'N/A'}
          </p>
        );
      });
  };

  return (
    <div className="employee-details-container">
      <div className="employee-details-header">
        <button
          className="employee-details-back-btn"
          onClick={() => setUserId(null)}
        >
          {'<'} Back
        </button>
        <h1 className="employee-details-title">
          {`${userDetails.firstName} ${userDetails.lastName}`}
        </h1>

        <span
          className="employee-details-status"
          style={{
            backgroundColor: userDetails.isActive ? 'green' : '#CC0000',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontWeight: 'bold',
          }}
        >
          {userDetails.isActive ? 'Active' : 'Left'}
        </span>
      </div>
      <div className="employee-details-user-data">{renderUserDetails()}</div>
    </div>
  );
};
