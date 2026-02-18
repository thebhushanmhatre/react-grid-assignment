import { useState } from 'react';
import { GridBuilder } from '../../components';
import { useColDefs, useFetchData } from '../../hooks';
import { EmployeeDetails } from '../EmployeeDetails/EmployeeDetails';
import './Employees.styles.css';

export const Employees = () => {
  // As an alternative to routing for now, we will use a state variable to control which page to display
  const [userId, setUserId] = useState<number | null>(null);

  const employeesData = useFetchData();
  const employeesColDefs = useColDefs(employeesData);

  const userDetails = employeesData.find((user) => user.id === userId);

  if (userId) {
    if (userDetails)
      return (
        <EmployeeDetails setUserId={setUserId} userDetails={userDetails} />
      );

    return <p>User not found</p>;
  }

  // Todo:
  // You can add group by options to group by or filter above the grid, skipping that as we have enabled the filter options on all the columns

  return (
    <div className="employees-container">
      <h1>Employees Data</h1>
      <GridBuilder
        rowData={employeesData}
        columnDefs={employeesColDefs}
        onRowClicked={(event) => setUserId(event.data.id)}
        // Keeping these values here just for Examples on how to pass additional properties
        // pagination={true}
        // paginationPageSize={10}
      />
    </div>
  );
};
