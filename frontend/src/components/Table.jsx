import * as React from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Box, Container, Pagination, styled, withStyles } from '@mui/material';
import { color } from '@mui/system';
// const DarkModeDataGrid = styled(DataGrid)(({ theme }) => ({
//   [`&.${gridClasses.detailPanel}`]: {
//     backgroundColor: theme.palette.background.paper,

// }));

const columns = [
  {
    field: 'id', headerName: 'ID', width: 100, hide: true,
  },
  {
    field: 'name', headerName: 'Name',
    width: 250,
    flex: 1,
  },
  {
    field: 'team',
    headerName: 'Team',
    width: 100,
    flex: 1,
  },
  {
    field: 'position',
    headerName: 'Position',
    width: 100,
    flex: 1,
  },
  {
    field: 'salary',
    headerName: 'Salary',
    width: 110,
    flex: 1,
  },
  {
    field: 'points',
    headerName: 'Points',
    width: 160,
    flex: 1,
  },
];

export default function DataGridDemo(props) {
  const { rows } = props;
  const [pageSize, setPageSize] = React.useState(5);
  const [name, setName] = React.useState('');
  const [points, setPoints] = React.useState('');
  const [image, setImage] = React.useState(null);
  const selectionModelChange = (rowid) => {
    const row = rows.find(row => row.id === rowid[0]);
    setName(row.name);
    setPoints(row.points);
    fetch('/playerImage?'+ new URLSearchParams({name: row.name})).then(res => res.json()).then(data => {
      setImage(data.imageURL);
    });
  }

  return (
    <Container maxWidth='xl' sx={{
      display: 'flex',
      height: '60vh',
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        pagination 
        onSelectionModelChange={selectionModelChange}
        />
      <Box component='div' sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 'rem',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        width: '20%',
        fontSize: '1.2rem',
        marginLeft: '15px',
      }}>
        {image && <img src={image} style={{
          aspectRatio: 1.2,
          width: '100%',
          marginBottom: '10px',
          borderRadius: '8px',
        }}/>}
        {name}
        <Box component='span' sx={{
          fontSize: '5rem',
          margin: '10px',
        }}>{points}</Box>
        <Box component='span' sx={{
          fontSize: '0.9rem', 
        }}>
        {points && 'Points'}
        </Box>
        </Box>

    </Container>
  );
}