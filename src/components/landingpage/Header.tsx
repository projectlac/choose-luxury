// material-ui
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Banner from '../../assets/header/banner.webp';
// third party
// project imports
// project imports
import Slider from 'react-slick';
import NextSlick from 'ui-component/extended/NextSlick';
import { useRouter } from 'next/router';

// styles
const BoxImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '392px',
  position: 'relative'
}));
// ==============================|| LANDING - HEADER PAGE ||============================== //

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <NextSlick
      className={className}
      style={{ ...style, right: '93px', width: '41px', height: '41px', transform: 'translateY(-50%)', top: '50%' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <NextSlick
      className={className}
      style={{
        ...style,
        left: '93px',
        width: '41px',
        height: '41px',
        transform: 'translateY(-50%) rotate(180deg)',
        top: '50%',
        zIndex: 1
      }}
      onClick={onClick}
    />
  );
}

const HeaderPage = () => {
  const router = useRouter();

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <>
      {router.asPath === '/' && (
        <Container maxWidth={'xl'} sx={{ marginTop: '30px' }}>
          <Slider {...settings}>
            <div>
              <BoxImage>
                <Image src={Banner.src} layout="fill" alt="" objectFit="cover"></Image>
              </BoxImage>
            </div>
            <div>
              <BoxImage>
                <Image src={Banner.src} layout="fill" alt="" objectFit="cover"></Image>
              </BoxImage>
            </div>
            <div>
              <BoxImage>
                <Image src={Banner.src} layout="fill" alt="" objectFit="cover"></Image>
              </BoxImage>
            </div>
            <div>
              <BoxImage>
                <Image src={Banner.src} layout="fill" alt="" objectFit="cover"></Image>
              </BoxImage>
            </div>
            <div>
              <BoxImage>
                <Image src={Banner.src} layout="fill" alt="" objectFit="cover"></Image>
              </BoxImage>
            </div>
            <div>
              <BoxImage>
                <Image src={Banner.src} layout="fill" alt="" objectFit="cover"></Image>
              </BoxImage>
            </div>
          </Slider>
        </Container>
      )}
    </>
  );
};

export default HeaderPage;
