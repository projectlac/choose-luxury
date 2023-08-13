import { Box, Container, Grid, MenuItem, Pagination, TextField } from '@mui/material';
import ImageProduct from 'assets/products/BAGS.png';
import React from 'react';
import { IDataShop } from 'types/shop/shopItem';
import Filter from '../Filter/Filter';
import ProductItem from '../ProductItem/ProductItem';

const data: IDataShop[] = [
  {
    image: ImageProduct.src,
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '1'
  },
  {
    image: ImageProduct.src,
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '2'
  },
  {
    image: ImageProduct.src,
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '3'
  },
  {
    image: ImageProduct.src,
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '4'
  },
  {
    image: ImageProduct.src,
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '0'
  },
  {
    image: ImageProduct.src,
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '5'
  },
  {
    image: ImageProduct.src,
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '6'
  },
  {
    image: ImageProduct.src,
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '7'
  },
  {
    image: ImageProduct.src,
    name: 'Classique Triomphe Bag in shiny calfskin',
    price: 'VND 1, 800, 000',
    oldPrice: 'VND 1, 800, 000',
    desc: 'Medium Triomphe Bag in shiny calfskin with an adjustable leather shoulder strap. The bag closes with a Triomphe clasp.',
    url: '',
    id: '8'
  }
];
function ShopIndex() {
  const [page1, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container>
      <Grid container columnSpacing={2}>
        <Grid item xs={3}>
          <Filter />
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            {data.map((d) => (
              <Grid item md={4} key={d.id}>
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
