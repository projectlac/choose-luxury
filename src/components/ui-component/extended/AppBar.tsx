import Image from 'next/image';
// material-ui
import { Box, Container, Stack, TextField, Typography } from '@mui/material';

// project imports
import Logo from '../../../assets/header/logo.png';
import WishList from '../../../assets/header/heart.png';
import Cart from '../../../assets/header/cart.png';

// assets
import { styled } from '@mui/styles';
import User from './User';

// elevation scroll

const CustomButton = styled('a')(({ theme }) => ({
  fontFamily: 'Quicksand',
  fontSize: '16px',
  fontWeight: '700',
  lineHeight: '14px',
  textDecoration: 'none',
  color: '#000',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '&.lang': {
    marginLeft: '93px'
  }
}));

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const AppBar = ({ ...others }) => {
  return (
    <>
      <Container
        maxWidth={'xl'}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between'
        }}
      >
        <Box width={191}>
          <Typography component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
            <Image src={Logo.src} alt="" width={191} height={150} />
          </Typography>
        </Box>
        <Box
          width={`calc(100% - 191px)`}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingBottom: '32px'
          }}
        >
          <Stack direction="row" sx={{ display: { xs: 'none', sm: 'flex' } }} spacing={6}>
            <CustomButton href="">Homepage</CustomButton>
            <CustomButton href="">About us</CustomButton>
            <CustomButton href="">Products</CustomButton>
            <CustomButton href="">Fashion trend</CustomButton>
            <CustomButton href="">Contact us</CustomButton>
          </Stack>
          <CustomButton className="lang">EN/VN</CustomButton>
          <Box
            sx={{
              display: 'flex',
              mr: 4,
              marginLeft: '93px',
              '> *': { marginLeft: '30px', cursor: 'pointer' },
              '> svg': { cursor: 'pointer' }
            }}
          >
            <User />
            <Box>
              <Image alt="wish-list" src={WishList.src} width={20} height={20}></Image>
            </Box>

            <Box>
              <Image alt="cart" src={Cart.src} width={20} height={20}></Image>
            </Box>
          </Box>
        </Box>
      </Container>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Box width={277}>
          <TextField
            fullWidth
            placeholder="Search"
            sx={{
              input: {
                background: '#fff',
                color: '#000',
                '&::placeholder': { color: '#000', fontWeight: 'bold', fontSize: '13', opacity: 1 }
              }
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default AppBar;
