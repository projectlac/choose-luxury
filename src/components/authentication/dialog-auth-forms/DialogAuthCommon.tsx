import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import AuthLogin from '../auth-forms/AuthLogin';

interface IDialogAuthCommon {
  children: React.ReactChild;
}
export default function DialogAuthCommon({ children }: IDialogAuthCommon) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {children}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <AuthLogin loginProp={1} />
      </Dialog>
    </div>
  );
}
