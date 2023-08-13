import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '@mui/material';
import { useTheme } from '@mui/styles';
import { Formik } from 'formik';
import React, { useState } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
function NewProduct() {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [fileList, setFileList] = React.useState<File>();
  const [fileListCurreny, setFileListCurreny] = React.useState<string[]>();
  const openDialog = () => {
    setOpen(true);
  };

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder'
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFileList(e.target.files?.[0]);
  };
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" width={200}>
          <Button
            sx={{
              ml: 1,
              height: '51.13px',
              fontFamily: 'Roboto',
              fontSize: '24px',
              fontWeight: '400',
              lineHeight: '28px',
              color: '#000',
              backgroundColor: 'rgba(191, 140, 10, 1)',
              '&:hover': { backgroundColor: 'rgba(191, 140, 10, 1)' }
            }}
            variant="contained"
            onClick={openDialog}
            fullWidth
          >
            Add products
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
            fontSize: '36px',
            fontWeight: '600',
            lineHeight: '44px'
          }}
        >
          Add products
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: '',
              price: 0,
              slug: '',
              description: '',
              category: '',
              file: null
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required(),
              price: Yup.number().required(),
              slug: Yup.string().required(),
              description: Yup.string(),
              category: Yup.string().required(),
              file: Yup.mixed().required('File is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {}}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                    Product name
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name-login"
                    type="name"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Product name"
                    inputProps={{}}
                    sx={{
                      fieldset: {
                        borderColor: 'rgba(191, 140, 10, 1) !important'
                      }
                    }}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error id="standard-weight-helper-text-name-login">
                      {errors.name}
                    </FormHelperText>
                  )}
                </FormControl>

                <Grid container columnSpacing={2}>
                  <Grid item md={4}>
                    <FormControl fullWidth error={Boolean(touched.price && errors.price)} sx={{ ...theme.typography.customInput }}>
                      <InputLabel htmlFor="outlined-adornment-price-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                        Price
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-price-login"
                        type={'number'}
                        value={values.price}
                        name="price"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="price"
                        inputProps={{}}
                        sx={{
                          fieldset: {
                            borderColor: 'rgba(191, 140, 10, 1) !important'
                          }
                        }}
                      />
                      {touched.price && errors.price && (
                        <FormHelperText error id="standard-weight-helper-text-price-login">
                          {errors.price}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item md={8}>
                    <FormControl fullWidth error={Boolean(touched.slug && errors.slug)} sx={{ ...theme.typography.customInput }}>
                      <InputLabel htmlFor="outlined-adornment-slug-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                        Slug
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-slug-login"
                        type={'number'}
                        value={values.slug}
                        name="slug"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="slug"
                        inputProps={{}}
                        sx={{
                          fieldset: {
                            borderColor: 'rgba(191, 140, 10, 1) !important'
                          }
                        }}
                      />
                      {touched.slug && errors.slug && (
                        <FormHelperText error id="standard-weight-helper-text-slug-login">
                          {errors.slug}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <FormControl fullWidth error={Boolean(touched.description && errors.description)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-description-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                    Description
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-description-login"
                    type={'text'}
                    value={values.description}
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="description"
                    inputProps={{}}
                    sx={{
                      fieldset: {
                        borderColor: 'rgba(191, 140, 10, 1) !important'
                      }
                    }}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error id="standard-weight-helper-text-description-login">
                      {errors.description}
                    </FormHelperText>
                  )}
                </FormControl>

                <Grid container columnSpacing={2}>
                  <Grid item md={4}>
                    <FormControl fullWidth error={Boolean(touched.category && errors.category)} sx={{ ...theme.typography.customInput }}>
                      <InputLabel htmlFor="outlined-adornment-category-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                        sx={{
                          fieldset: {
                            borderColor: 'rgba(191, 140, 10, 1) !important'
                          },
                          height: '62px',
                          div: {
                            marginTop: '15px'
                          }
                        }}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>

                      {touched.category && errors.category && (
                        <FormHelperText error id="standard-weight-helper-text-category-login">
                          {errors.category}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item md={8}>
                    {values.file}
                    <FormControl fullWidth error={Boolean(touched.slug && errors.slug)} sx={{ ...theme.typography.customInput }}>
                      <label htmlFor="file">
                        <input style={{ display: 'none' }} id="file" name="file" type="file" onChange={handleFile} />

                        <Button
                          color="secondary"
                          variant="contained"
                          component="span"
                          fullWidth
                          sx={{
                            height: '62px',
                            backgroundColor: '#fff',
                            border: '1px solid rgba(191, 140, 10, 1)!important',
                            borderRadius: '8px',
                            boxShadow: 'none',
                            '&:hover': {
                              backgroundColor: 'inherit',
                              boxShadow: 'none'
                            },
                            '&:before': {
                              content: `"Browser..."`,
                              width: '120px',
                              height: '100%',
                              background: 'rgba(238, 238, 238, 1)',
                              fontFamily: 'Open Sans',
                              fontSize: '19px',
                              fontWeight: '600',
                              lineHeight: '33px',
                              position: 'absolute',
                              left: '0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'rgba(191, 140, 10, 1)',
                              borderRadius: '8px 0 0 8px'
                            },
                            '&:after': {
                              content: fileList?.name ? `"${fileList?.name}"` : `"No image selected"`,
                              color: 'rgba(169, 169, 169, 1)',
                              fontSize: '20px',
                              left: '150px',
                              position: 'absolute'
                            }
                          }}
                        ></Button>
                      </label>

                      {touched.slug && errors.slug && (
                        <FormHelperText error id="standard-weight-helper-text-slug-login">
                          {errors.slug}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Grid container columnSpacing={2}>
                    <Grid item md={4}>
                      <AnimateButton>
                        <Button
                          disableElevation
                          disabled={isSubmitting}
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
                          Add
                        </Button>
                      </AnimateButton>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewProduct;
