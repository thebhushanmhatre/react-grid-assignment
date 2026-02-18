import type { UserType } from '../../models/User';
import { extractHeader } from '../../utilities';
import './EmployeeDetails.styles.css';

export const EmployeeDetails = ({
  userDetails,
  setUserId,
}: {
  userDetails: UserType;
  setUserId: (id: number | null) => void;
}) => {
  // Todos:
  // 1. Get userDetails from userData, instead getting it from props
  // 2. Manager name should show manager details
  // 3. This feature will require back button to navigate to previous page using history
  // 4. Email should be copyable (window.navigator.clipboard.writeText)
  // 5. Skills should be clickable - on Click should take you back to home page with skills filter applied
  // 6. Same filter feature on Position and Department should be applied

  const skipKeys = [
    'id',
    'firstName',
    'lastName',
    'isActive',
    'performanceRating',
    'salary',
  ];

  const renderUserDetails = () => {
    return Object.entries(userDetails)
      .filter(([key]) => !skipKeys.includes(key))
      .map(([key, value]) => {
        return (
          <p key={key}>
            <strong>{extractHeader(key)}</strong>: {value}
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
