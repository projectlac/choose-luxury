import { styled } from '@mui/material/styles';
import ContactUs from 'components/AboutUs/ContactUs';
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
      <ContactUs />
      <Footer />
    </div>
  );
};

export default AboutUsIndex;
