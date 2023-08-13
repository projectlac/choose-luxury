import { Box, MenuItem, Pagination, TextField } from '@mui/material';
import React from 'react';

function PaginationComponent() {
  const [page1, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '19px' }}>
      <TextField
        select
        sx={{
          width: '100px',
          height: '32px',
          '.MuiSelect-select': {
            padding: '6px 15px'
          }
        }}
        SelectProps={{
          renderValue: (value) => {
            return `Show ${value}`;
          }
        }}
        value={rowsPerPage}
        onChange={handleChangeRowsPerPage}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
      </TextField>

      <Pagination
        count={10}
        onChange={(_, page) => {
          handleChangePage(page);
        }}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
}

export default PaginationComponent;
