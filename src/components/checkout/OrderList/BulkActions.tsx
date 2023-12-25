import { Box, Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: red;
     color: #fff;

     &:hover {
        background: red;
     }
    `
);
interface IBulk {
  selectedCryptoOrders: string[];
  resetSelected: () => void;
}
function BulkActions({ selectedCryptoOrders, resetSelected }: IBulk) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAll = () => {
    console.log('a');
  };
  const deleteAll = () => {
    setOpen(true);
  };
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography color="text.secondary">Delete selection</Typography>
          <ButtonError sx={{ ml: 1 }} startIcon={<DeleteTwoToneIcon />} variant="contained" onClick={deleteAll}>
            Delete
          </ButtonError>
        </Box>
      </Box>
      <Dialog open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <DialogTitle
          sx={{
            fontFamily: 'Montserrat'
          }}
        >
          Are you sure you want to delete?
        </DialogTitle>

        <DialogActions
          sx={{
            padding: '15px',
            '& button': {
              fontFamily: 'Montserrat'
            }
          }}
        >
          <Button onClick={handleCloseAll} variant="contained" color="primary">
            OK
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BulkActions;
