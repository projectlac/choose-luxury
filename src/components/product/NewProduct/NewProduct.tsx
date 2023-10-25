import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material';
import { useTheme } from '@mui/styles';
import { useFormik } from 'formik';
import { useState } from 'react';
import { dispatch, useSelector } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
import { addProduct } from '../../../../api/ProductAPI/productDashboash';
import ItemAttachments from '../DropImage/DropImage';

interface IAddProductProps {
  reload: () => void;
}

function NewProduct({ reload }: IAddProductProps) {
  const theme = useTheme();
  const { category: categories, brand, size } = useSelector((state) => state.product);
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState<boolean>(false);
  const openDialog = () => {
    setOpen(true);
  };

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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      price: '',
      slug: '',
      description: '',
      category: '',
      oldPrice: '',
      brand: '',
      size: '',
      unitInStock: '',
      isAvaliable: false,
      file: [],
      submit: null
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.string().required(),
      slug: Yup.string().required(),
      description: Yup.string(),
      category: Yup.string().required(),
      file: Yup.array().min(1, 'Required')
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
      const {
        name,
        price,
        slug,
        description,
        category,
        file,
        brand: brandProduct,
        size: sizeProduct,
        isAvaliable,
        oldPrice,
        unitInStock
      } = values;
      const fd = new FormData();
      fd.append('product_name', name);
      fd.append('base_price', price);
      fd.append('slug', slug);
      fd.append('product_description', description);
      fd.append('old_price', oldPrice);
      fd.append('product_brand_name', brandProduct);
      fd.append('is_available', isAvaliable.toString());
      fd.append('unit_in_stock', unitInStock);
      fd.append('product_size_name', sizeProduct);
      fd.append('name_category', category);
      if (file) {
        file.forEach((fileItem: File) => {
          fd.append('uploaded_images', fileItem);
        });
      }
      try {
        // console.log('pass');
        setLoading(true);

        await addProduct(fd);
        setStatus({ success: true });
        setSubmitting(false);
        dispatch(
          openSnackbar({
            open: true,
            message: 'Create Product Successful',
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
        reload();
      } catch (err: any) {
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      } finally {
        setLoading(false);
      }
    }
  });

  const onChangeImage = (data: File[]) => {
    formik.handleChange({
      target: { name: 'file', value: data }
    });
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" width={200}>
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
            fontSize: '20px',
            fontWeight: '600',
            lineHeight: '25px'
          }}
        >
          Add products
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth error={Boolean(formik.touched.name && formik.errors.name)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                Product name
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-name-login"
                type="name"
                value={formik.values.name}
                name="name"
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
              {formik.touched.name && formik.errors.name && (
                <FormHelperText error id="standard-weight-helper-text-name-login">
                  {formik.errors.name}
                </FormHelperText>
              )}
            </FormControl>

            <Grid container columnSpacing={2}>
              <Grid item md={3}>
                <FormControl
                  fullWidth
                  error={Boolean(formik.touched.oldPrice && formik.errors.oldPrice)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-oldPrice-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                    Old price
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-oldPrice-login"
                    type={'number'}
                    value={formik.values.oldPrice}
                    name="oldPrice"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label="Old price"
                    inputProps={{}}
                    sx={{
                      fieldset: {
                        borderColor: 'rgba(191, 140, 10, 1) !important'
                      }
                    }}
                  />
                  {formik.touched.oldPrice && formik.errors.oldPrice && (
                    <FormHelperText error id="standard-weight-helper-text-oldPrice-login">
                      {formik.errors.oldPrice}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={3}>
                <FormControl
                  fullWidth
                  error={Boolean(formik.touched.price && formik.errors.price)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-price-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                    Price
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-price-login"
                    type={'number'}
                    value={formik.values.price}
                    name="price"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label="price"
                    inputProps={{}}
                    sx={{
                      fieldset: {
                        borderColor: 'rgba(191, 140, 10, 1) !important'
                      }
                    }}
                  />
                  {formik.touched.price && formik.errors.price && (
                    <FormHelperText error id="standard-weight-helper-text-price-login">
                      {formik.errors.price}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth error={Boolean(formik.touched.slug && formik.errors.slug)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-slug-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                    Slug
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-slug-login"
                    type={'text'}
                    value={formik.values.slug}
                    name="slug"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label="slug"
                    inputProps={{}}
                    sx={{
                      fieldset: {
                        borderColor: 'rgba(191, 140, 10, 1) !important'
                      }
                    }}
                  />
                  {formik.touched.slug && formik.errors.slug && (
                    <FormHelperText error id="standard-weight-helper-text-slug-login">
                      {formik.errors.slug}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <FormControl
              fullWidth
              error={Boolean(formik.touched.description && formik.errors.description)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-description-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                Description
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-description-login"
                type={'text'}
                value={formik.values.description}
                name="description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                label="description"
                inputProps={{}}
                sx={{
                  fieldset: {
                    borderColor: 'rgba(191, 140, 10, 1) !important'
                  }
                }}
              />
              {formik.touched.description && formik.errors.description && (
                <FormHelperText error id="standard-weight-helper-text-description-login">
                  {formik.errors.description}
                </FormHelperText>
              )}
            </FormControl>

            <Grid container columnSpacing={2}>
              <Grid item md={3}>
                <FormControl
                  fullWidth
                  error={Boolean(formik.touched.category && formik.errors.category)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-category-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
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
                    {categories.results.map((data) => (
                      <MenuItem key={data.id} value={data.name_category}>
                        {data.name_category}
                      </MenuItem>
                    ))}
                  </Select>

                  {formik.touched.category && formik.errors.category && (
                    <FormHelperText error id="standard-weight-helper-text-category-login">
                      {formik.errors.category}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={3}>
                <FormControl
                  fullWidth
                  error={Boolean(formik.touched.brand && formik.errors.brand)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-brand-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                    Brand
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="brand"
                    value={formik.values.brand}
                    onChange={formik.handleChange}
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
                    {brand.results.map((data) => (
                      <MenuItem key={data.id} value={data.product_brand_name}>
                        {data.product_brand_name}
                      </MenuItem>
                    ))}
                  </Select>

                  {formik.touched.brand && formik.errors.brand && (
                    <FormHelperText error id="standard-weight-helper-text-brand-login">
                      {formik.errors.brand}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={3}>
                <FormControl fullWidth error={Boolean(formik.touched.size && formik.errors.size)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-size-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                    Size
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    name="size"
                    value={formik.values.size}
                    onChange={formik.handleChange}
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
                    {size.results.map((data) => (
                      <MenuItem key={data.id} value={data.product_size_name}>
                        {data.product_size_name}
                      </MenuItem>
                    ))}
                  </Select>

                  {formik.touched.size && formik.errors.size && (
                    <FormHelperText error id="standard-weight-helper-text-size-login">
                      {formik.errors.size}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={3}>
                <FormControl
                  fullWidth
                  error={Boolean(formik.touched.unitInStock && formik.errors.unitInStock)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-unitInStock-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                    Unit In Stock
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-unitInStock-login"
                    type={'number'}
                    value={formik.values.unitInStock}
                    name="unitInStock"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label="unitInStock"
                    inputProps={{}}
                    sx={{
                      fieldset: {
                        borderColor: 'rgba(191, 140, 10, 1) !important'
                      }
                    }}
                  />
                  {formik.touched.unitInStock && formik.errors.unitInStock && (
                    <FormHelperText error id="standard-weight-helper-text-unitInStock-login">
                      {formik.errors.unitInStock}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={12}>
                <FormControl fullWidth error={Boolean(formik.touched.file && formik.errors.file)} sx={{ ...theme.typography.customInput }}>
                  File Attachments
                  <ItemAttachments
                    trigger={open}
                    attachments={[]}
                    onChange={(e) => {
                      onChangeImage(e);
                    }}
                  />
                  {formik.touched.file && formik.errors.file && (
                    <FormHelperText error id="standard-weight-helper-text-file-login">
                      {formik.errors.file}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item md={12}>
                <FormControl
                  fullWidth
                  error={Boolean(formik.touched.isAvaliable && formik.errors.isAvaliable)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.isAvaliable}
                        sx={{
                          color: 'rgba(191, 140, 10, 1)',
                          '&.Mui-checked': {
                            color: 'rgba(191, 140, 10, 1)'
                          }
                        }}
                      />
                    }
                    onChange={formik.handleChange}
                    name="isAvaliable"
                    label="Is avaliable"
                  />

                  {formik.touched.isAvaliable && formik.errors.isAvaliable && (
                    <FormHelperText error id="standard-weight-helper-text-isAvaliable-login">
                      {formik.errors.isAvaliable}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
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
                      onClick={() => {
                        console.log(formik.errors);
                      }}
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

export default NewProduct;
