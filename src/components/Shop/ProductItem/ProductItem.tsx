import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { IResponseGetProductById } from 'types/services/productApi.types';
import formatMoney from 'utils/formatMoney';
interface ProductItemProps {
  data: IResponseGetProductById;
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
      <Link href={`/product-detail/${data.id}`}>
        <a>
          {data.images && data.images[0]?.product_img && (
            <ProductImage
              sx={{
                '&:before': {
                  content: `""`,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  background: `url(${data.images.length > 1 ? data.images[1]?.product_img : data.images[0]?.product_img})`,
                  zIndex: '1',
                  width: '100%',
                  height: '100%',
                  transition: 'all 0.3s ease-out',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  opacity: 0
                },
                '&:hover&:before': {
                  opacity: 1
                }
              }}
            >
              <Image alt={data.product_name} src={data.images[0]?.product_img} layout="fill" objectFit="cover"></Image>
            </ProductImage>
          )}
        </a>
      </Link>

      <ProductContent>
        <Link href={`/product-detail/${data.id}`}>
          <a>
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
              {data.product_name}
            </Typography>
          </a>
        </Link>
        <Typography color="rgba(245, 34, 34, 1)" style={{ fontSize: '14px', fontWeight: '700', lineHeight: '17px', marginBottom: '5px' }}>
          {formatMoney(data.base_price)} VNĐ
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
          {formatMoney(data.old_price)} VNĐ
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
          {data.product_description}
        </Typography>
      </ProductContent>
    </ProductWrapper>
  );
}

export default ProductItem;
