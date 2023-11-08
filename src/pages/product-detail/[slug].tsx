import { styled } from '@mui/material/styles';
import Footer from 'components/landingpage/Footer';
import Header from 'components/landingpage/Header';
import ProductDetail from 'components/product/ProductDetail';
import RelatedProduct from 'components/product/RelatedProduct';
import Breadcrumbs from 'components/widget/Breadcum';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IResponseGetProductById } from 'types/services/productApi.types';
import AppBar from 'ui-component/extended/AppBar';
import { getProductById } from '../../../api/ProductAPI/productDashboash';
const HeaderWrapper = styled('div')(({ theme }) => ({
  overflowX: 'hidden',
  overflowY: 'clip'
}));

function ProductDetailIndex() {
  const router = useRouter();
  const { slug } = router.query;

  const [data, setData] = useState<IResponseGetProductById>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getProductById(slug as string);
      setData(res.data);
    };
    fetchData();
  }, [slug]);
  return (
    <div>
      <HeaderWrapper id="home">
        <AppBar />
        <Header />
      </HeaderWrapper>
      <Breadcrumbs />
      {data && <ProductDetail data={data} />}
      <RelatedProduct />
      <Footer />
    </div>
  );
}

export default ProductDetailIndex;
