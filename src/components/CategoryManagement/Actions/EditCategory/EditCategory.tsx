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
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material';
import { useTheme } from '@mui/styles';
import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { dispatch, useSelector } from 'store';
import { getCategories } from 'store/slices/product';
import { openSnackbar } from 'store/slices/snackbar';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
import { retrieveCategory, updateCategory } from '../../../../../api/CategoryAPI/categoryAPI';

interface IEditProps {
  id: number;
}

interface IDefaultForm {
  name_category: string;
  parent: string;
  level: number;
  submit: null | string;
}
function EditCategory({ id }: IEditProps) {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  const { category: categories } = useSelector((state) => state.product);

  const [defaultForm, setDefaultForm] = useState<IDefaultForm>({
    name_category: '',
    parent: '',
    level: 0,
    submit: null
  });

  const [loading, setLoading] = useState<boolean>(false);

  const openDialog = () => {
    setOpen(true);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const renderCategoryName = useCallback((categoryName: string, level: number) => {
    let space = '';
    if (level === 0) return categoryName;
    for (let i = 0; i < level; i++) space += '   ';

    return space + categoryName;
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: defaultForm,
    validationSchema: Yup.object().shape({
      name_category: Yup.string().required()
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
      const { name_category, parent } = values;
      try {
        setLoading(true);
        await updateCategory(id, { name_category, parent: parent.toString().trim() ? parent : '' });

        setStatus({ success: true });
        setSubmitting(false);
        dispatch(
          openSnackbar({
            open: true,
            message: 'Update Category Successful',
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
        dispatch(getCategories(1));
      } catch (err: any) {
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
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
      const res = await retrieveCategory(id);
      const getData = {
        name_category: res.data.name_category,
        parent: res.data.parent,
        level: res.data.level,
        submit: null
      };

      setDefaultForm(getData);
    };
    if (open) {
      fetchData();
    }
  }, [id, open]);

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
              error={Boolean(formik.touched.name_category && formik.errors.name_category)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                Category Name
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-name_category-login"
                type="name_category"
                value={formik.values.name_category}
                name="name_category"
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
              {formik.touched.name_category && formik.errors.name_category && (
                <FormHelperText error id="standard-weight-helper-text-name_category-login">
                  {formik.errors.name_category}
                </FormHelperText>
              )}
            </FormControl>

            <Grid container columnSpacing={2}>
              <Grid item md={3}>
                <FormControl
                  fullWidth
                  error={Boolean(formik.touched.parent && formik.errors.parent)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-parent-login" sx={{ '&.Mui-focused': { color: 'rgba(191, 140, 10, 1)' } }}>
                    Parent
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="parent"
                    value={formik.values.parent}
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
                    <MenuItem value={''}>(None)</MenuItem>
                    {categories.results.map((data) => (
                      <MenuItem key={data.id} value={data.id}>
                        {renderCategoryName(data.name_category, data.level)}
                      </MenuItem>
                    ))}
                  </Select>

                  {formik.touched.parent && formik.errors.parent && (
                    <FormHelperText error id="standard-weight-helper-text-parent-login">
                      {formik.errors.parent}
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

export default EditCategory;
