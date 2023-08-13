import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';

function NewStock() {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Button sx={{ ml: 1 }} variant="contained" onClick={openDialog}>
            + New stock
          </Button>
        </Box>
      </Box>
      <Dialog
        open={open}
        keepMounted
        fullWidth={true}
        maxWidth="md"
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            fontFamily: 'Montserrat'
          }}
        >
          Add stock
        </DialogTitle>
        <DialogContent>cccc</DialogContent>
        <DialogActions
          sx={{
            padding: '15px',
            '& button': {
              fontFamily: 'Montserrat'
            }
          }}
        >
          <Button variant="contained" color="primary">
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

export default NewStock;
