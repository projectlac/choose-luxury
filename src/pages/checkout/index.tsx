import { styled } from '@mui/material/styles';
import CheckoutIndex from 'components/checkout/CheckoutIndex';
import Footer from 'components/landingpage/Footer';
import Header from 'components/landingpage/Header';
import RelatedProduct from 'components/product/RelatedProduct';
import Breadcrumbs from 'components/widget/Breadcum';
import AppBar from 'ui-component/extended/AppBar';
const HeaderWrapper = styled('div')(({ theme }) => ({
  overflowX: 'hidden',
  overflowY: 'clip'
}));

function ProductDetailIndex() {
  return (
    <div>
      <HeaderWrapper id="home">
        <AppBar />
        <Header />
      </HeaderWrapper>
      <Breadcrumbs />
      <CheckoutIndex />
      <RelatedProduct />
      <Footer />
    </div>
  );
}

export default ProductDetailIndex;
