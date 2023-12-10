import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';

interface DialogBillProps {
  openBill: boolean;
  handleCloseBill: () => void;
}
function DialogBill({ openBill, handleCloseBill }: DialogBillProps) {
  return (
    <Dialog open={openBill} keepMounted onClose={handleCloseBill} fullWidth>
      <DialogTitle>{'Bill'}</DialogTitle>
      <DialogContent>
        <Box>
          <Typography>Name</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default DialogBill;
