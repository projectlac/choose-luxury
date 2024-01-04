// material-ui
import { styled } from '@mui/material/styles';

// project imports
import BestOfSale from 'components/landingpage/BestOfSale';
import Footer from 'components/landingpage/Footer';
import Header from 'components/landingpage/Header';
import NewProduct from 'components/landingpage/NewProduct';
import OutService from 'components/landingpage/OutService';
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
    <SecondWrapper>
      <NewProduct />
    </SecondWrapper>
    <SecondWrapper>
      <BestOfSale />
    </SecondWrapper>
    <Footer />
    {/* <Customization /> */}
  </>
);

export default Landing;
