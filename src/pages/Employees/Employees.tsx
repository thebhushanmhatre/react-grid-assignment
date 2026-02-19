import type { RowDoubleClickedEvent } from 'ag-grid-community';
import { useCallback, lazy, Suspense, useMemo, useState } from 'react';
import { Dropdown, GridBuilder, Loading } from '../../components';
import { useColDefs, useFetchData } from '../../hooks';
import type { UserType } from '../../models';
import './Employees.styles.css';

// Not necessarily required but adding for performance optimization demonstration
// Code splitting, Deferring this component from our main bundle
const EmployeeDetails = lazy(
  () => import('../EmployeeDetails/EmployeeDetails'),
);

export const Employees = () => {
  // As an alternative to routing for now, we will use a state variable to control which page to display
  const [userId, setUserId] = useState<number | null>(null);
  const [groupBy, setGroupBy] = useState<string>('');
  const [filterOnValue, setFilterOnValue] = useState<string>('');

  const { employeesData, groupByKeys, valuesToSelectOptions } = useFetchData();
  const valueOptions = valuesToSelectOptions[groupBy];

  const employeesColDefs = useColDefs(
    employeesData,
    setGroupBy,
    setFilterOnValue,
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

  const userDetails = useMemo(
    () => employeesData.find((user) => user.id === userId),
    [employeesData, userId],
  );

  const handleRowDoubleClicked = useCallback((event: RowDoubleClickedEvent) => {
    setUserId(event.data.id);
  }, []);

  const selectGroup = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupBy(e.target.value);
    setFilterOnValue('');
  }, []);

  const resetFilters = useCallback(() => {
    setGroupBy('');
    setFilterOnValue('');
  }, []);

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
    }),
    [],
  );

  if (userId) {
    if (userDetails)
      return (
        <Suspense fallback={<Loading />}>
          <EmployeeDetails
            setUserId={setUserId}
            userDetails={userDetails}
            setGroupBy={setGroupBy}
            setFilterOnValue={setFilterOnValue}
            groupByKeys={groupByKeys}
          />
        </Suspense>
      );

    return <p>User not found</p>;
  }

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
          className="clear-filters-btn"
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
          onRowDoubleClicked: handleRowDoubleClicked,
          defaultColDef: defaultColDef,
        }}
      />
    </div>
  );
};
