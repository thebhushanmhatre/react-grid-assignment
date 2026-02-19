import type { ColDef } from 'ag-grid-community';
import { useMemo } from 'react';
import { DepartmentCR, EmailsCR, SkillsCR } from '../components/GridBuilder';
import { extractHeader } from '../utilities';

export function useColDefs(
  data: Record<string, string | number | boolean | string[]>[],
  setGroupBy: React.Dispatch<React.SetStateAction<string>>,
  setFilterOnValue: React.Dispatch<React.SetStateAction<string>>,
) {
  return useMemo(() => {
    const colDefs: ColDef[] = [];
    const skipColumns = ['id', 'salary', 'performanceRating'];

    if (!data || data.length === 0) return [];

    // Basic
    for (const key in data[0]) {
      if (skipColumns.includes(key)) continue;
      // Customizing for Skills column
      if (key == 'skills') {
        colDefs.push({
          field: key,
          headerName: extractHeader(key),
          filter: true,
          width: 500,
          autoHeight: true, // Only enable autoHeight where needed
          wrapText: true,
          cellRenderer: SkillsCR,
          cellRendererParams: {
            setGroupBy,
            setFilterOnValue,
          },
          valueFormatter: (params) => {
            // This is not for visual purpose on UI, ag grid needs this, maybe a fallback incase custom cell render fails
            return params.value ? params.value.join(', ') : '';
          },
        });
      } else {
        const colDef: ColDef = {
          field: key,
          headerName: extractHeader(key),
        };

        // Customizing for Department column
        if (key == 'department') {
          // Adding some random colors to show demonstrate how to style cell
          const bgColorMapping: Record<string, string> = {
            Engineering: 'skyblue',
            HR: 'pink',
            Marketing: 'lightgreen',
            Finance: 'coral',
            Sales: 'gold',
          };

          colDef.cellRenderer = DepartmentCR;
          colDef.cellRendererParams = {
            setGroupBy,
            setFilterOnValue,
          };
          colDef.cellStyle = (params) => {
            if (params.value && bgColorMapping[params.value]) {
              return {
                backgroundColor: bgColorMapping[params.value],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              };
            }
            return null;
          };
        }

        if (key == 'email') {
          colDef.cellRenderer = EmailsCR;
          colDef.width = 300;
        }

        colDefs.push(colDef);
      }
    }

    // My thoughts
    // For Advance stuff
    // I like to get these info from DB with various customised options
    // like if you want to customize any column I just keep name of the customized Component in the DB
    // example: { ..., customCellRenderer: 'DepartmentCR'  }
    // and i will maintain list of string to Component mapping here
    // exmaple: {'DepartmentCR': DepartmentCR, 'SkillsCR': SkillsCR }
    // and using that I will import that component and use it in the colDef
    // I have built in this in my previous org

    return colDefs;
  }, [data, setGroupBy, setFilterOnValue]);
}
