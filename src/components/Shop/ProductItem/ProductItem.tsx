import { Box, Typography } from '@mui/material';
import { IDataShop } from 'types/shop/shopItem';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
interface ProductItemProps {
  data: IDataShop;
}

const ProductWrapper = styled(Box)(({ theme }) => ({
  background: 'rgba(229, 229, 231, 1)'
}));

const ProductImage = styled(Box)(({ theme }) => ({
  height: '206px',
  borderBottom: '1px solid rgba(169, 169, 169, 1)',
  width: '100%',
  position: 'relative'
}));
const ProductContent = styled(Box)(({ theme }) => ({
  padding: '17px 11px'
}));
function ProductItem({ data }: ProductItemProps) {
  return (
    <ProductWrapper>
      <ProductImage>
        <Image alt={data.name} src={data.image} layout="fill" objectFit="contain"></Image>
      </ProductImage>
      <ProductContent>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '17px',
            fontFamily: "'Lato','Roboto',sans-serif",
            color: '#000',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '2',
            overflow: 'hidden',
            marginBottom: '10px'
          }}
        >
          {data.name}
        </Typography>
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
            fontWeight: '400',
            textAlign: 'justify',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '3',
            overflow: 'hidden'
          }}
        >
          {data.desc}
        </Typography>
      </ProductContent>
    </ProductWrapper>
  );
}

export default ProductItem;
