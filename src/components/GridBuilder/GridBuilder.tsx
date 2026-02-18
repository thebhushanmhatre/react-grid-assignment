import './GridBuilder.styles.css';
import {
  AllCommunityModule,
  type ColumnMovedEvent,
  type ColumnState,
  type FirstDataRenderedEvent,
} from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useRef } from 'react';

import type { AgGridReactProps } from 'ag-grid-react';
// Grid Builder: Takes grid config and data to output grid
export const GridBuilder = ({
  gridName,
  gridProps,
}: {
  gridName: string;
  gridProps: AgGridReactProps;
}) => {
  const gridRef = useRef(null);
  const modules = [AllCommunityModule];

  const saveToLocalStorage = (columnState: ColumnState[]) => {
    localStorage.setItem(`${gridName}-Col-State`, JSON.stringify(columnState));
  };

  const onColumnMoved = (e: ColumnMovedEvent) => {
    // storing user preferences, keeping it basic for now
    if (e.finished) {
      saveToLocalStorage(e.api?.getColumnState());
    }
  };

  const onFirstDataRendered = (e: FirstDataRenderedEvent) => {
    const savedColState = localStorage.getItem(`${gridName}-Col-State`);
    if (savedColState) {
      e.api?.applyColumnState({
        state: JSON.parse(savedColState),
        applyOrder: true,
      });
    }
  };

  return (
    <AgGridProvider modules={modules}>
      <div className="grid-container">
        <AgGridReact
          ref={gridRef}
          {...gridProps}
          onColumnMoved={onColumnMoved}
          onFirstDataRendered={onFirstDataRendered}
        />
      </div>
    </AgGridProvider>
  );
};

// Note: Sharing some of my thoughts
// Why have I used GridBuilder rather than just using AgGridReact, anyway I am passing all the props to AgGridReact as it is?
// In this project where I don't have a design system to follow, i can use AgGrid directly
// But in real life projects, where we have to follow a consistent deisng system, having layer of abstraction can help
// I would generally keep all the custom components (column Render or value renderers), Styles and this file in a folder like this
// Then focus on solving the business problem in the rest of the codebase
// Even better thing would be, We make this independent module/library and use it in across projects

// Later on I am adding more features like save column State to local Storage so user can get a consistent customized view
