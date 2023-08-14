import { styled } from '@mui/material/styles';
import Footer from 'components/landingpage/Footer';
import Header from 'components/landingpage/Header';
import ProductDetail from 'components/product/ProductDetail';
import RelatedProduct from 'components/product/RelatedProduct';
import Breadcrumbs from 'components/widget/Breadcum';
import { IProductDetail } from 'types/shop/product';
import AppBar from 'ui-component/extended/AppBar';
const HeaderWrapper = styled('div')(({ theme }) => ({
  overflowX: 'hidden',
  overflowY: 'clip'
}));

function ProductDetailIndex() {
  const data: IProductDetail = {
    image: [
      'https://pos.nvncdn.net/0a688a-28099/ps/20230811_VxQWJyGKil.jpeg',
      'https://pos.nvncdn.net/0a688a-28099/ps/20230811_VxQWJyGKil.jpeg',
      'https://pos.nvncdn.net/0a688a-28099/ps/20230811_VxQWJyGKil.jpeg',
      'https://pos.nvncdn.net/0a688a-28099/ps/20230811_VxQWJyGKil.jpeg'
    ],
    name: 'Classic triomphe bag in shiny calfskin',
    id: '1233333',
    brand: 'vetement',
    productCode: 'ah2568',
    price: '8.800.000 d',
    oldPrice: '8.800.000 d',
    size: [
      { size: 'XXS', checked: false, id: '1' },
      { size: 'XS', checked: false, id: '2' },
      { size: 'S', checked: false, id: '31' },
      { size: 'M', checked: false, id: '4' }
    ]
  };
  return (
    <div>
      <HeaderWrapper id="home">
        <AppBar />
        <Header />
      </HeaderWrapper>
      <Breadcrumbs />
      <ProductDetail data={data} />
      <RelatedProduct />
      <Footer />
    </div>
  );
}

export default ProductDetailIndex;
