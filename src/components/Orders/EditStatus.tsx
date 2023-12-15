import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Box, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, FormGroup, MenuItem, Slide, TextField } from '@mui/material';
import { useFormik } from 'formik';

import { TransitionProps } from '@mui/material/transitions';
import React, { useEffect, useState } from 'react';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { IUpdateStatusOrderForm, TStatus } from 'types/services/cartApi.types';
import { CustomButton } from 'common/button';
import orderAPI from '../../../api/OrderAPI/OrderAPI';

interface IEdit {
  status: TStatus;
  id: number;
  isDelivered: boolean;
  isPaid: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditTag({ id, status, isDelivered, isPaid }: IEdit) {
  const [initForm, setInitForm] = useState<IUpdateStatusOrderForm>({
    isPaid: false,
    isDelivered: false,
    status: 'Pending',
    submit: null
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initForm,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        console.log('dm');

        const { status: status1, isDelivered: isDelivered1, isPaid: isPaid1 } = values;
        const res = await orderAPI.updateStatusOrder(id, { status: status1, isDelivered: isDelivered1, isPaid: isPaid1 });
        console.log(res);

        // if (res.status === 200) {
        //   dispatch(
        //     openSnackbar({
        //       open: true,
        //       message: 'Update profile successful!',
        //       variant: 'alert',
        //       alert: {
        //         color: 'success'
        //       },
        //       close: false
        //     })
        //   );
        // }
      } catch (err: any) {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Something failed',
            variant: 'alert',
            alert: {
              color: 'error'
            },

            severity: 'error',
            close: false
          })
        );
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    }
  });

  useEffect(() => {
    if (openDialog)
      setInitForm((prev) => ({
        ...prev,
        status: status,
        isPaid: isPaid,
        isDelivered: isDelivered
      }));
  }, [openDialog, , status, isPaid, isDelivered]);

  return (
    <div>
      <Box onClick={handleOpenDialog}>
        <EditTwoToneIcon />
      </Box>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
        disableEnforceFocus
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Update Status</DialogTitle>
          <DialogContent>
            <TextField
              name={'status'}
              label={'Status'}
              select
              value={formik.values && formik.values.status}
              onChange={formik.handleChange}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
              InputLabelProps={{ shrink: true }}
              SelectProps={{
                MenuProps: {
                  style: {
                    maxHeight: '300px'
                  }
                }
              }}
              fullWidth
              sx={{ mt: 3 }}
            >
              <MenuItem value={'New Order'}> New Order</MenuItem>
              <MenuItem value={'Pending'}> Pending</MenuItem>
              <MenuItem value={'Completed'}> Completed</MenuItem>
            </TextField>

            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                value={formik.values && formik.values.isPaid}
                onChange={formik.handleChange}
                label="Is Paid"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Is Delivered"
                value={formik.values && formik.values.isDelivered}
                onChange={formik.handleChange}
              />
            </FormGroup>

            <CustomButton
              variant="contained"
              type="submit"
              disabled={formik.isSubmitting}
              onClick={() => {
                console.log(formik.errors);
              }}
              sx={{ mt: 3 }}
            >
              Update
            </CustomButton>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

export default EditTag;
