import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import type { AgGridReactProps } from 'ag-grid-react';

import './GridBuilder.styles.css';

// Grid Builder: Takes grid config and data to output grid
export const GridBuilder = (gridProps: AgGridReactProps) => {
  const modules = [AllCommunityModule];

  return (
    <AgGridProvider modules={modules}>
      <div className="grid-container">
        <AgGridReact {...gridProps} />
      </div>
    </AgGridProvider>
  );
};
