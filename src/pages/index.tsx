// material-ui
import { styled } from '@mui/material/styles';

// project imports
import BestOfSale from 'components/landingpage/BestOfSale';
import Footer from 'components/landingpage/Footer';
import Header from 'components/landingpage/Header';
import OutService from 'components/landingpage/OutService';
import Subscribe from 'components/landingpage/Subscribe';
import AppBar from 'ui-component/extended/AppBar';

const HeaderWrapper = styled('div')(({ theme }) => ({
  overflowX: 'hidden',
  overflowY: 'clip'
}));

const SecondWrapper = styled('div')(({ theme }) => ({
  display: 'block'
}));

// =============================|| LANDING MAIN ||============================= //

const Landing: React.FC = () => (
  <>
    <HeaderWrapper id="home">
      <AppBar />
      <Header />
    </HeaderWrapper>
    <SecondWrapper>
      <OutService />
    </SecondWrapper>
    {/* <SecondWrapper>
      <Subscribe />
    </SecondWrapper> */}
    <SecondWrapper>
      <BestOfSale />
    </SecondWrapper>
    <Footer />
    {/* <Customization /> */}
  </>
);

export default Landing;
