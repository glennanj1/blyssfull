// import { DataGrid } from '@mui/x-data-grid';

// const rows  = [
//     { id: 1, col1: 'Hello', col2: 'World' },
//     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//     { id: 3, col1: 'MUI', col2: 'is Amazing' },
//   ];

//   const columns = [
//     { field: 'col1', headerName: 'Column 1', width: 150 },
//     { field: 'col2', headerName: 'Column 2', width: 150 },
//   ];

//   export default function App() {
//     return (
//       <div style={{width: '50%', height: '100vh'}} className='w-100 h-100 flex content-center align-center justify-center flex-wrap'>
//         <DataGrid checkboxSelection rows={rows} columns={columns} />
//       </div>
//     );
//   }
  

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

export default function BasicExampleDataGrid() {
  const { data } = useDemoData(
  
  {
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  debugger

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid {...data} />
    </div>
  );
}
