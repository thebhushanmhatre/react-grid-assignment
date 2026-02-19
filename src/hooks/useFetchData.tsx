import { useMemo } from 'react';
import data from '../data/factwiseData.json';

import type { UserType } from '../models';

export function useFetchData() {
  // Ideally we would fetch data from an API here asyncronously, but for the sake of this assignment, we will use the local JSON file.
  // Dropdown options is also kind of static data, so that can also come from API and cached

  return useMemo(() => {
    const employeesData = data.employees as UserType[];

    const groupByKeys: (keyof UserType & string)[] = [
      'department',
      'position',
      'location',
    ];
    const valuesToSelectOptionSet: Record<string, Set<string>> = {};
    groupByKeys.forEach(
      (itemKey) => (valuesToSelectOptionSet[itemKey] = new Set<string>()),
    );
    const skillOptions = new Set<string>();

    for (const employee of employeesData) {
      groupByKeys.forEach((itemKey) => {
        const value = employee[itemKey];
        if (typeof value === 'string') {
          valuesToSelectOptionSet[itemKey].add(value);
        }
      });

      // Skills are an array, so add each one individually
      employee.skills.forEach((skill) => skillOptions.add(skill));
    }

    const valuesToSelectOptions: Record<string, string[]> = {};
    groupByKeys.forEach((itemKey) => {
      valuesToSelectOptions[itemKey] = Array.from(
        valuesToSelectOptionSet[itemKey],
      );
    });
    valuesToSelectOptions['skills'] = Array.from(skillOptions);

    // skills are added to keys for UI grouping
    const finalGroupByKeys = [...groupByKeys, 'skills'];

    return {
      employeesData,
      groupByKeys: finalGroupByKeys,
      valuesToSelectOptions,
    };
  }, []);
}
