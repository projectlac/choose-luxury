import EditIcon from '@mui/icons-material/Edit';
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
import useScriptRef from 'hooks/useScriptRef';
import React, { useEffect, useState } from 'react';
import { dispatch } from 'store';
import { getProductSize } from 'store/slices/product';
import { openSnackbar } from 'store/slices/snackbar';
import { IResponseImageArray } from 'types/services/productApi.types';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
import productSizeApi from '../../../../../api/ProductAPI/productSize';

interface IEditProps {
  id: number;
}

interface IDefaultForm {
  product_size_name: string;

  submit: null | string;
}
function EditSize({ id }: IEditProps) {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [defaultForm, setDefaultForm] = useState<IDefaultForm>({
    product_size_name: '',

    submit: null
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [fileListCurreny, setFileListCurreny] = React.useState<IResponseImageArray[]>();
  const openDialog = () => {
    setOpen(true);
  };
  const scriptedRef = useScriptRef();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: defaultForm,
    validationSchema: Yup.object().shape({
      product_size_name: Yup.string().required()
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
      const { product_size_name } = values;

      try {
        setLoading(true);
        await productSizeApi.updateProductSize(id, product_size_name);

        if (scriptedRef.current) {
          setStatus({ success: true });
          setSubmitting(false);
          dispatch(
            openSnackbar({
              open: true,
              message: 'Update Product Size Successful',
              variant: 'alert',
              anchorOrigin: { vertical: 'top', horizontal: 'right' },
              alert: {
                color: 'success'
              },
              close: false
            })
          );
          resetForm();
          handleClose();
          dispatch(getProductSize());
        }
      } catch (err: any) {
        if (scriptedRef.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      } finally {
        setLoading(false);
      }
    }
  });

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await productSizeApi.retrieveProductSize(id);
      const getData = {
        product_size_name: res.data.product_size_name,
        submit: null
      };
      setDefaultForm(getData);
    };
    if (open) {
      fetchData();
    }
  }, [id, open]);

  const onChangeImage = (data: File[]) => {
    formik.handleChange({
      target: { name: 'file', value: data }
    });
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <EditIcon sx={{ color: 'rgba(241, 119, 6, 1)', marginRight: '15px', cursor: 'pointer' }} onClick={openDialog} />
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
          Edit products
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              fullWidth
              error={Boolean(formik.touched.product_size_name && formik.errors.product_size_name)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                Product Size name
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-product_size_name-login"
                value={formik.values.product_size_name}
                name="product_size_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                label="Product name"
                inputProps={{}}
                sx={{
                  fieldset: {
                    borderColor: 'rgba(191, 140, 10, 1) !important'
                  }
                }}
              />
              {formik.touched.product_size_name && formik.errors.product_size_name && (
                <FormHelperText error id="standard-weight-helper-text-product_size_name-login">
                  {formik.errors.product_size_name}
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
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Edit'}
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

export default EditSize;
