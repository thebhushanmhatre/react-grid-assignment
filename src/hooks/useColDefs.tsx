import { extractHeader } from '../utilities';

export function useColDefs(
  data: Record<string, string | number | boolean | string[]>[],
) {
  const colDefs = [];
  const skipColumns = ['id', 'salary', 'performanceRating'];

  // Basic
  for (const key in data[0]) {
    if (skipColumns.includes(key)) continue;
    colDefs.push({ field: key, headerName: extractHeader(key), filter: true });
  }

  // For Advance stuff
  // I like to get these info from DB with various customised options
  // like if you want to customize any column I just keep name of the customized Component in the DB
  // and i will maintain list of string to Component mapping here
  // and using that I will import that component and use it in the colDef
  // I have built in this in my previous org

  return colDefs;
}
