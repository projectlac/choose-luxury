// material-ui
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Banner1 from '../../assets/header/1600w-lYcbGpUSVGo.webp';
import Banner2 from '../../assets/header/1600w-z8oqB6n7Bjg.webp';
import Banner from '../../assets/header/banner.webp';

// third party
// project imports
// project imports
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import NextSlick from 'ui-component/extended/NextSlick';

// styles
const BoxImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '700px',
  position: 'relative',
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
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
      {router.asPath === '/' && (
        <Box sx={{ marginTop: '30px' }}>
          <Slider {...settings}>
            <div>
              <BoxImage>
                <img src={Banner.src}></img>
              </BoxImage>
            </div>
            <div>
              <BoxImage>
                <img src={Banner1.src}></img>
              </BoxImage>
            </div>
            <div>
              <BoxImage>
                <img src={Banner2.src}></img>
              </BoxImage>
            </div>
            <div>
              <BoxImage>
                <img src={Banner1.src}></img>
              </BoxImage>
            </div>
            <div>
              <BoxImage>
                <img src={Banner.src}></img>
              </BoxImage>
            </div>
            <div>
              <BoxImage>
                <img src={Banner1.src}></img>
              </BoxImage>
            </div>
          </Slider>
        </Box>
      )}
    </>
  );
};

export default HeaderPage;
