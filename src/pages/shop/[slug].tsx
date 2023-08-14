import { styled } from '@mui/material/styles';
import ShopIndex from 'components/Shop/ShopIndex/ShopIndex';
import Footer from 'components/landingpage/Footer';
import Header from 'components/landingpage/Header';
import Breadcrumbs from 'components/widget/Breadcum';
import React from 'react';
import AppBar from 'ui-component/extended/AppBar';

const HeaderWrapper = styled('div')(({ theme }) => ({
  overflowX: 'hidden',
  overflowY: 'clip'
}));

const Shop: React.FC = () => {
  return (
    <div>
      <HeaderWrapper id="home">
        <AppBar />
        <Header />
      </HeaderWrapper>
      <Breadcrumbs />
      <ShopIndex />
      <Footer />
    </div>
  );
};

export default Shop;
