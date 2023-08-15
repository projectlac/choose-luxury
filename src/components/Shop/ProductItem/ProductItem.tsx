import { Box, Typography } from '@mui/material';
import { IDataShop } from 'types/shop/shopItem';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
interface ProductItemProps {
  data: IDataShop;
}

const ProductWrapper = styled(Box)(({ theme }) => ({
  background: 'rgb(224 224 224)'
}));

const ProductImage = styled(Box)(({ theme }) => ({
  height: '256px',
  borderBottom: '1px solid rgba(169, 169, 169, 1)',
  width: '100%',
  position: 'relative',
  cursor: 'pointer'
}));
const ProductContent = styled(Box)(({ theme }) => ({
  padding: '17px 11px'
}));
function ProductItem({ data }: ProductItemProps) {
  return (
    <ProductWrapper>
      <Link href={'/product-detail/123'}>
        <ProductImage>
          <Image alt={data.name} src={data.image} layout="fill" objectFit="contain"></Image>
        </ProductImage>
      </Link>

      <ProductContent>
        <Link href={'/product-detail/123'}>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '600',
              lineHeight: '17px',
              fontFamily: "Quicksand,'Roboto',sans-serif",
              color: '#000',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: '2',
              overflow: 'hidden',
              marginBottom: '10px',
              cursor: 'pointer'
            }}
          >
            {data.name}
          </Typography>
        </Link>
        <Typography color="rgba(245, 34, 34, 1)" style={{ fontSize: '14px', fontWeight: '700', lineHeight: '17px', marginBottom: '5px' }}>
          {data.price}
        </Typography>
        <Typography
          sx={{
            fontSize: '13px',
            fontWeight: '400',
            lineHeight: '16px',
            color: 'rgba(169, 169, 169, 1)',
            textDecoration: 'line-through',
            marginBottom: '10px'
          }}
        >
          {data.oldPrice}
        </Typography>
        <Typography
          sx={{
            color: '#000',
            fontSize: '14px',

            textAlign: 'justify',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '3',
            overflow: 'hidden',
            fontFamily: 'Quicksand',
            fontWeight: '500'
          }}
        >
          {data.desc}
        </Typography>
      </ProductContent>
    </ProductWrapper>
  );
}

export default ProductItem;
