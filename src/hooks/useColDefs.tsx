import type { ColDef } from 'ag-grid-community';
import { DepartmentCR } from '../components/GridBuilder/cellRenderers/DepartmentCR';
import { extractHeader } from '../utilities';

export function useColDefs(
  data: Record<string, string | number | boolean | string[]>[],
  // setGroupBy: React.Dispatch<React.SetStateAction<string>>,
  // setFilterOnValue: React.Dispatch<React.SetStateAction<string>>,
) {
  const colDefs: ColDef[] = [];
  const skipColumns = ['id', 'salary', 'performanceRating'];

  // Basic
  for (const key in data[0]) {
    if (skipColumns.includes(key)) continue;
    if (key == 'skills') {
      colDefs.push({
        field: key,
        headerName: extractHeader(key),
        filter: true,
        width: 400,
        valueFormatter: (p: { value: string[] }) => p.value.join(', '),
      });
    } else {
      const colDef: ColDef = {
        field: key,
        headerName: extractHeader(key),
      };

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
          // setGroupBy,
          // setFilterOnValue,
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

      colDefs.push(colDef);
    }
  }

  // For Advance stuff
  // I like to get these info from DB with various customised options
  // like if you want to customize any column I just keep name of the customized Component in the DB
  // and i will maintain list of string to Component mapping here
  // and using that I will import that component and use it in the colDef
  // I have built in this in my previous org

  return colDefs;
}
