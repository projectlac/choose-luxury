import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import ImageProduct from 'assets/products/BAGS.png';
import { IDataShop } from 'types/shop/shopItem';
import ProductItem from 'components/Shop/ProductItem/ProductItem';
function RelatedProduct() {
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
    }
  ];
  return (
    <Container sx={{ marginTop: '140px', marginBottom: '125px' }}>
      <Typography
        variant={'h2'}
        sx={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: '700', lineHeight: '19px', marginBottom: '16px' }}
      >
        RELATED PRODUCTS
      </Typography>
      <Grid container columnSpacing={1}>
        {data.map((d) => (
          <Grid item md={3} key={d.id}>
            <ProductItem data={d} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RelatedProduct;
