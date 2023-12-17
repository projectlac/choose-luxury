import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import { useTheme } from '@mui/styles';
import { useFormik } from 'formik';
import { useState } from 'react';
import { dispatch } from 'store';
import { getBrands } from 'store/slices/product';
import { openSnackbar } from 'store/slices/snackbar';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
import { addBrand } from '../../../../../api/BrandAPI/brandAPI';

function NewBrand() {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const openDialog = () => {
    setOpen(true);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      product_brand_name: '',
      parent: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      product_brand_name: Yup.string().required()
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
      const { product_brand_name } = values;

      try {
        setLoading(true);

        await addBrand(product_brand_name);
        setStatus({ success: true });
        setSubmitting(false);
        dispatch(
          openSnackbar({
            open: true,
            message: 'Create Brand Successful',
            variant: 'alert',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        dispatch(getBrands());
        resetForm();
        setOpen(false);
      } catch (err: any) {
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      } finally {
        setLoading(false);
      }
    }
  });

  const handleClose = () => {
    formik.resetForm();
    setOpen(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center" width={150}>
          <Button
            sx={{
              ml: 1,
              height: '40px',
              fontFamily: 'Roboto',
              fontSize: '18px',
              fontWeight: '400',
              lineHeight: '28px',
              color: '#fff',
              backgroundColor: 'rgba(191, 140, 10, 1)',
              '&:hover': { backgroundColor: 'rgba(191, 140, 10, 1)' }
            }}
            variant="contained"
            onClick={openDialog}
            fullWidth
          >
            Add brand
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
            fontFamily: 'Inter',
            fontSize: '20px',
            fontWeight: '600',
            lineHeight: '25px'
          }}
        >
          Add category
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              fullWidth
              error={Boolean(formik.touched.product_brand_name && formik.errors.product_brand_name)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                Brand Name
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-product_brand_name-login"
                type="product_brand_name"
                value={formik.values.product_brand_name}
                name="product_brand_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                label="Category Name"
                inputProps={{}}
                sx={{
                  fieldset: {
                    borderColor: 'rgba(191, 140, 10, 1) !important'
                  }
                }}
              />
              {formik.touched.product_brand_name && formik.errors.product_brand_name && (
                <FormHelperText error id="standard-weight-helper-text-product_brand_name-login">
                  {formik.errors.product_brand_name}
                </FormHelperText>
              )}
            </FormControl>

            <Box sx={{ mt: 2 }}>
              {formik.errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{formik.errors.submit}</FormHelperText>
                </Box>
              )}

              <Grid container columnSpacing={2}>
                <Grid item md={4}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={formik.isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: 'rgba(191, 140, 10, 1)',
                        '&:hover': {
                          backgroundColor: 'rgb(167 121 3)'
                        },
                        height: '62px',
                        fontFamily: 'Open Sans',
                        fontSize: '23px',
                        fontWeight: '700',
                        lineHeight: '54px'
                      }}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Add'}
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewBrand;
