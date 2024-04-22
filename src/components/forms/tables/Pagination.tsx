import { Box, MenuItem, Pagination, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

interface IPaginationProps {
  handleChangePage: Dispatch<SetStateAction<number>>;
  handleChangeLimit?: Dispatch<SetStateAction<number>>;

  count: number;
}
function PaginationComponent({ handleChangePage, handleChangeLimit, count }: IPaginationProps) {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    handleChangeLimit?.(+event.target.value);
    handleChangePage(1);
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
        count={count}
        onChange={(_, page) => {
          handleChangePage(page);
        }}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Box>
  );
}

export default PaginationComponent;
