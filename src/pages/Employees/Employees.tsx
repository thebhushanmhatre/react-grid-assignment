import type { RowDoubleClickedEvent } from 'ag-grid-community';
import { useMemo, useState } from 'react';
import { Dropdown, GridBuilder } from '../../components';
import { useColDefs, useFetchData } from '../../hooks';
import type { UserType } from '../../models/User';
import { EmployeeDetails } from '../EmployeeDetails/EmployeeDetails';
import './Employees.styles.css';

export const Employees = () => {
  // As an alternative to routing for now, we will use a state variable to control which page to display
  const [userId, setUserId] = useState<number | null>(null);
  const [groupBy, setGroupBy] = useState<string>('');
  const [filterOnValue, setFilterOnValue] = useState<string>('');

  const { employeesData, groupByKeys, valuesToSelectOptions } = useFetchData();
  const valueOptions = valuesToSelectOptions[groupBy];

  const employeesColDefs = useColDefs(
    employeesData,
    // setGroupBy,
    // setFilterOnValue,
  );

  const dataToDisplay = useMemo(() => {
    if (groupBy && filterOnValue) {
      return employeesData.filter((user: UserType) => {
        const value = user[groupBy as keyof UserType];
        if (Array.isArray(value)) {
          return value.includes(filterOnValue);
        }
        return value === filterOnValue;
      });
    }
    return employeesData;
  }, [employeesData, groupBy, filterOnValue]);

  const userDetails = employeesData.find((user) => user.id === userId);

  if (userId) {
    if (userDetails)
      return (
        <EmployeeDetails
          setUserId={setUserId}
          userDetails={userDetails}
          setGroupBy={setGroupBy}
          setFilterOnValue={setFilterOnValue}
          groupByKeys={groupByKeys}
        />
      );

    return <p>User not found</p>;
  }

  const selectGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupBy(e.target.value);
    setFilterOnValue('');
  };

  const resetFilters = () => {
    setGroupBy('');
    setFilterOnValue('');
  };

  return (
    <div className="employees-container">
      <h1>Employee Directory</h1>
      <div className="additional-options-container">
        <Dropdown
          options={groupByKeys}
          onChange={selectGroup}
          label="Filter Category"
          value={groupBy}
          defaultOptionText="Choose category..."
        />
        <Dropdown
          options={valueOptions}
          onChange={(e) => setFilterOnValue(e.target.value)}
          label="Filter Value"
          value={filterOnValue}
          defaultOptionText="Choose value..."
          disabled={!groupBy}
        />
        <button
          type="button"
          onClick={resetFilters}
          disabled={!groupBy && !filterOnValue}
        >
          Clear Filters
        </button>
      </div>
      <GridBuilder
        gridName={'Employees'}
        gridProps={{
          rowData: dataToDisplay,
          columnDefs: employeesColDefs,
          onRowDoubleClicked: (event: RowDoubleClickedEvent) =>
            setUserId(event.data.id),
          defaultColDef: {
            resizable: true,
            sortable: true,
            filter: true,
            autoHeight: true,
          },
        }}
      />
    </div>
  );
};
