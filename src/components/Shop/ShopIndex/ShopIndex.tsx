import { Box, Container, Drawer, Grid, MenuItem, Pagination, TextField, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { IDataShop } from 'types/shop/shopItem';
import Filter from '../Filter/Filter';
import ProductItem from '../ProductItem/ProductItem';
import PriceFilter from '../Filter/PriceFilter';
import ProductFilter from '../Filter/ProductFilter';
import SizeFilter from '../Filter/SizeFilter';
import BrandFilter from '../Filter/BrandFilter';
import CloseIcon from '@mui/icons-material/Close';

const data: IDataShop[] = [
  {
    image: 'https://pos.nvncdn.net/0a688a-28099/ps/20230811_yCKeS9CxUH.jpeg',
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '1'
  },
  {
    image: 'https://pos.nvncdn.net/0a688a-28099/ps/20230811_yCKeS9CxUH.jpeg',
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '2'
  },
  {
    image: 'https://pos.nvncdn.net/0a688a-28099/ps/20230811_yCKeS9CxUH.jpeg',
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '3'
  },
  {
    image: 'https://pos.nvncdn.net/0a688a-28099/ps/20230811_yCKeS9CxUH.jpeg',
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '4'
  },
  {
    image: 'https://pos.nvncdn.net/0a688a-28099/ps/20230811_yCKeS9CxUH.jpeg',
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '0'
  },
  {
    image: 'https://pos.nvncdn.net/0a688a-28099/ps/20230811_yCKeS9CxUH.jpeg',
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '5'
  },
  {
    image: 'https://pos.nvncdn.net/0a688a-28099/ps/20230811_yCKeS9CxUH.jpeg',
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '6'
  },
  {
    image: 'https://pos.nvncdn.net/0a688a-28099/ps/20230811_yCKeS9CxUH.jpeg',
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '7'
  },
  {
    image: 'https://pos.nvncdn.net/0a688a-28099/ps/20230811_yCKeS9CxUH.jpeg',
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '8'
  }
];
function ShopIndex() {
  const [hiddenFilter, setHiddenFilter] = useState<boolean>(false);
  const [page1, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container maxWidth="xl">
      <Grid container columnSpacing={4}>
        <Grid item xs={3}>
          <Filter setHiddenFilter={setHiddenFilter} hiddenFilter={hiddenFilter} />
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
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid item xs={3} sx={{ display: !matchDownSM && !hiddenFilter ? 'block' : 'none' }}>
          <PriceFilter />
          <ProductFilter />
          <SizeFilter />
          <BrandFilter />
        </Grid>
        <Grid item xs={!matchDownSM && !hiddenFilter ? 9 : 12}>
          <Grid container spacing={3}>
            {data.map((d) => (
              <Grid item md={!hiddenFilter ? 4 : 3} sm={6} xs={12} key={d.id}>
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
              count={10}
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
