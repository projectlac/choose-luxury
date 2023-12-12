import { styled } from '@mui/material/styles';
import AboutUs from 'components/AboutUs/AboutUs';
import Footer from 'components/landingpage/Footer';
import Header from 'components/landingpage/Header';
import Breadcrumbs from 'components/widget/Breadcum';
import React from 'react';
import AppBar from 'ui-component/extended/AppBar';

const HeaderWrapper = styled('div')(({ theme }) => ({
  overflowX: 'hidden',
  overflowY: 'clip'
}));

const AboutUsIndex: React.FC = () => {
  return (
    <div>
      <HeaderWrapper id="home">
        <AppBar />
        <Header />
      </HeaderWrapper>
      <Breadcrumbs />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default AboutUsIndex;
