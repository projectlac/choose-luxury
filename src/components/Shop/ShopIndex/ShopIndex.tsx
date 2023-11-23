import CloseIcon from '@mui/icons-material/Close';
import { Box, Container, Drawer, Grid, MenuItem, Pagination, TextField, useMediaQuery, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { dispatch } from 'store';
import { hiddenLoading, showLoading } from 'store/slices/loading';
import { getBrands, getCategories, getProductSize } from 'store/slices/product';
import { IResponseGetProductById } from 'types/services/productApi.types';
import { getProduct } from '../../../../api/ProductAPI/productDashboash';
import BrandFilter from '../Filter/BrandFilter';
import Filter from '../Filter/Filter';
import PriceFilter from '../Filter/PriceFilter';
import ProductFilter from '../Filter/ProductFilter';
import SizeFilter from '../Filter/SizeFilter';
import ProductItem from '../ProductItem/ProductItem';

function ShopIndex() {
  const [hiddenFilter, setHiddenFilter] = useState<boolean>(false);
  const [page1, setPage] = React.useState(1);
  const [total, setTotal] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  const handleChangePage = (page: number) => {
    setPage(page);
  };
  const [productList, getProductList] = useState<IResponseGetProductById[]>([]);
  const [search, setSearch] = useState<string>('');

  // const [page, setPage] = useState<number>(1);

  const getListProduct = useCallback(
    async (searchParam: string) => {
      const res = await getProduct({ search: searchParam, page: page1 });

      getProductList(res.data.results);
      setTotal(res.data.count);
    },
    [page1]
  );

  const reloadListProduct = useCallback(async () => {
    try {
      dispatch(showLoading());
      await getListProduct(search);
      dispatch(getBrands(1, 999));
      dispatch(getProductSize(1, 999));
      dispatch(getCategories(1, 999));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(hiddenLoading());
    }
  }, [getListProduct, search]);

  useEffect(() => {
    reloadListProduct();
  }, [reloadListProduct]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container maxWidth="xl">
      <Grid container columnSpacing={4}>
        <Grid item xs={3}>
          <Filter setHiddenFilter={setHiddenFilter} hiddenFilter={hiddenFilter} />
          {matchDownMD && (
            <Drawer
              anchor="top"
              open={hiddenFilter}
              onClose={() => {
                setHiddenFilter(false);
              }}
            >
              {hiddenFilter && (
                <Box sx={{ width: 'auto', padding: '15px' }} role="presentation">
                  <Box display={'flex'} justifyContent={'flex-end'} mb={3}>
                    <CloseIcon
                      onClick={() => {
                        setHiddenFilter(false);
                      }}
                    />
                  </Box>
                  <PriceFilter />
                  <ProductFilter />
                  <SizeFilter />
                  <BrandFilter />
                </Box>
              )}
            </Drawer>
          )}
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid item xs={3} sx={{ display: !matchDownMD && !hiddenFilter ? 'block' : 'none' }}>
          <PriceFilter />
          <ProductFilter />
          <SizeFilter />
          <BrandFilter />
        </Grid>
        <Grid item xs={!matchDownMD && !hiddenFilter ? 9 : 12}>
          <Grid container spacing={3}>
            {productList.map((d) => (
              <Grid item md={3} sm={6} xs={12} key={d.id}>
                <ProductItem data={d} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '19px' }}>
            <TextField
              select
              sx={{
                width: '100px',
                height: '32px',
                '.MuiSelect-select': {
                  padding: '6px 15px'
                }
              }}
              SelectProps={{
                renderValue: (value) => {
                  return `Show ${value}`;
                }
              }}
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </TextField>

            <Pagination
              count={Math.ceil(total / 10)}
              onChange={(_, page) => {
                handleChangePage(page);
              }}
              variant="outlined"
              shape="rounded"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ShopIndex;
