// material-ui
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Banner from '../../assets/header/banner.webp';
import Banner1 from '../../assets/header/1600w-lYcbGpUSVGo.webp';
import Banner2 from '../../assets/header/1600w-z8oqB6n7Bjg.webp';

// third party
// project imports
// project imports
import Slider from 'react-slick';
import NextSlick from 'ui-component/extended/NextSlick';
import { useRouter } from 'next/router';

// styles
const BoxImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '700px',
  position: 'relative',

  [theme.breakpoints.down('lg')]: {
    height: '600px'
  },
  [theme.breakpoints.down('md')]: {
    height: '400px'
  },
  [theme.breakpoints.down('sm')]: {
    height: '300px'
  }
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
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    fade: true
  };

  return (
    <>
      {['/'].includes(router.asPath) && (
        <Box>
          <Slider {...settings}>
            <div>
              <BoxImage>
                <Image src={Banner.src} layout="fill" alt="" objectFit="cover"></Image>
              </BoxImage>
            </div>
            <div>
              <BoxImage>
                <Image src={Banner1.src} layout="fill" alt="" objectFit="cover"></Image>
              </BoxImage>
            </div>
            <div>
              <BoxImage>
                <Image src={Banner2.src} layout="fill" alt="" objectFit="cover"></Image>
              </BoxImage>
            </div>
            <div>
              <BoxImage>
                <Image src={Banner1.src} layout="fill" alt="" objectFit="cover"></Image>
              </BoxImage>
            </div>
            <div>
              <BoxImage>
                <Image src={Banner.src} layout="fill" alt="" objectFit="cover"></Image>
              </BoxImage>
            </div>
            <div>
              <BoxImage>
                <Image src={Banner1.src} layout="fill" alt="" objectFit="cover"></Image>
              </BoxImage>
            </div>
          </Slider>
        </Box>
      )}
    </>
  );
};

export default HeaderPage;
