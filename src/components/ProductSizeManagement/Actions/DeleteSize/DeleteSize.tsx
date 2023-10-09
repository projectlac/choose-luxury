import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import { useState } from 'react';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import productSizeApi from '../../../../../api/ProductAPI/productSize';
import { getProductSize } from 'store/slices/product';

interface IDeleteProps {
  id: number;
  name: string;
}

function DeleteProduct({ id, name }: IDeleteProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const deleteAction = async () => {
    setLoading(true);
    try {
      await productSizeApi.deleteProductSize(id);

      dispatch(
        openSnackbar({
          open: true,
          message: 'Delete Product Size Successful',
          variant: 'alert',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          alert: {
            color: 'success'
          },
          close: true
        })
      );
      handleClose();
      dispatch(getProductSize());
    } catch (error) {
      dispatch(
        openSnackbar({
          open: true,
          message: `Something went wrong`,
          variant: 'alert',
          severity: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          alert: {
            color: 'error'
          },
          close: true
        })
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <DeleteIcon sx={{ color: 'rgba(245, 34, 34, 1)', marginRight: '15px', cursor: 'pointer' }} onClick={openDialog} />
        </Box>
      </Box>
      <Dialog
        open={open}
        keepMounted
        fullWidth={true}
        maxWidth="sm"
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            fontFamily: 'Inter',
            fontSize: '20px',
            fontWeight: '600',
            lineHeight: '25px'
          }}
        >
          Delete products
        </DialogTitle>
        <Divider />
        <DialogContent>{`Are you sure you want to delete the product "${name}"?`}</DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={deleteAction} color="error" variant="contained">
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
          </Button>
          <Button autoFocus onClick={handleClose} variant="contained">
            Take me back
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteProduct;
