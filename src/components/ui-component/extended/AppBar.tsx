import Image from 'next/image';
// material-ui
import { Box, Container, Drawer, Link, List, ListItemButton, ListItemText, Stack, TextField } from '@mui/material';

// project imports
import MenuIcon from '@mui/icons-material/Menu';
import Cart from '../../../assets/header/cart.png';
import WishList from '../../../assets/header/heart.png';
import Logo from '../../../assets/header/logo.png';
// assets
import { styled } from '@mui/styles';
import DialogAuthCommon from 'components/authentication/dialog-auth-forms/DialogAuthCommon';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import User from './User';
import { useSelector } from 'store';
import LocalizationSection from 'layout/MainLayout/Header/LocalizationSection';
import { FormattedMessage, useIntl } from 'react-intl';

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
    marginLeft: '93px',
    [theme.breakpoints.down('xl')]: {
      marginLeft: '93px'
    },
    [theme.breakpoints.down('lg')]: {
      marginLeft: '45px'
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '30px'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  [theme.breakpoints.down('xl')]: {
    fontSize: '16px'
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: '15px'
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '13px'
  }
}));

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const AppBar = ({ ...others }) => {
  const { isLoggedIn } = useAuth();
  const intl = useIntl();
  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const cart = useSelector((state) => state.cart.checkout);
  /** Method called on multiple components with different event types */
  const drawerToggler = (open: boolean) => (event: any) => {
    if (event.type! === 'keydown' && (event.key! === 'Tab' || event.key! === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };

  useEffect(() => {
    if (cart?.products.length) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 1000);
    }
  }, [cart]);

  return (
    <>
      <Container
        maxWidth={'xl'}
        sx={{
          display: 'flex',
          alignItems: { sm: 'flex-end', xs: 'center' },
          justifyContent: 'space-between'
        }}
      >
        <Box width={'25%'} sx={{ display: { xs: 'block', sm: 'none' } }}>
          <MenuIcon onClick={drawerToggler(true)} />
          <Drawer anchor="top" open={drawerToggle} onClose={drawerToggler(false)}>
            {drawerToggle && (
              <Box sx={{ width: 'auto' }} role="presentation" onClick={drawerToggler(false)} onKeyDown={drawerToggler(false)}>
                <List>
                  <Link style={{ textDecoration: 'none' }} href="#" target="_blank">
                    <ListItemButton component="a">
                      <ListItemText primary="Home" />
                    </ListItemButton>
                  </Link>
                  <Link style={{ textDecoration: 'none' }} href="#" target="_blank">
                    <ListItemButton component="a">
                      <ListItemText primary="About us" />
                    </ListItemButton>
                  </Link>
                  <Link style={{ textDecoration: 'none' }} href="/shop" target="_blank">
                    <ListItemButton component="a">
                      <ListItemText primary="Products" />
                    </ListItemButton>
                  </Link>
                  <Link style={{ textDecoration: 'none' }} href="#" target="_blank">
                    <ListItemButton component="a">
                      <ListItemText primary="Fashion trend" />
                    </ListItemButton>
                  </Link>
                  <Link style={{ textDecoration: 'none' }} href="#" target="_blank">
                    <ListItemButton component="a">
                      <ListItemText primary="Contact us" />
                    </ListItemButton>
                  </Link>
                </List>
              </Box>
            )}
          </Drawer>
        </Box>
        <Box
          component={'a'}
          href="/"
          sx={{
            width: { md: '191px', xs: '100px' }
          }}
        >
          <Box
            sx={{
              width: { lg: '191px', md: '150px', xs: '100px' },
              height: { lg: '150px', md: '110px', xs: '85px' },
              position: 'relative'
            }}
          >
            <Image src={Logo.src} layout="fill" alt="" objectFit="cover" />
          </Box>
        </Box>
        <Box
          width={`calc(100% - 191px)`}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingBottom: { sm: '32px', xs: '0' },
            width: { sm: 'auto', xs: '25%' }
          }}
        >
          <Stack direction="row" sx={{ display: { xs: 'none', sm: 'flex' } }} spacing={{ xs: 1, sm: 1, md: 2, lg: 4 }}>
            <CustomButton href="/">
              <FormattedMessage id="homepage" />
            </CustomButton>
            <CustomButton href="">
              <FormattedMessage id="about-us" />
            </CustomButton>
            <CustomButton href="/shop">
              <FormattedMessage id="shop" />
            </CustomButton>
            <CustomButton href="">Fashion trend</CustomButton>
            <CustomButton href="">
              <FormattedMessage id="contact-us" />
            </CustomButton>
          </Stack>
          {/* <CustomButton className="lang">EN/VN</CustomButton> */}
          <LocalizationSection />
          <Box
            sx={{
              display: 'flex',
              mr: { sm: 4, xs: 0 },

              marginLeft: { lg: '75px', md: '15px', xs: '30px' },
              '> *': { marginLeft: { lg: '30px', md: '15px', xs: '7px' }, cursor: 'pointer' },
              '> svg': { cursor: 'pointer' }
            }}
          >
            {isLoggedIn ? (
              <User />
            ) : (
              <DialogAuthCommon>
                <User />
              </DialogAuthCommon>
            )}

            <Box width={20}>
              {isLoggedIn ? (
                <Image alt="wish-list" src={WishList.src} width={20} height={20}></Image>
              ) : (
                <DialogAuthCommon>
                  <Image alt="wish-list" src={WishList.src} width={20} height={20}></Image>
                </DialogAuthCommon>
              )}
            </Box>
            <Box
              width={20}
              sx={{
                position: 'relative',
                animation: shake ? 'shakeCart .4s ease-in-out forwards' : ''
              }}
            >
              <Link href="/checkout">
                <Image alt="cart" src={Cart.src} width={20} height={20}></Image>
              </Link>
              <Box
                sx={{
                  width: 17,
                  height: 17,
                  background: '#d33',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: '#fff',
                  fontSize: 10,
                  position: 'absolute',
                  top: -10,
                  right: -10
                }}
              >
                {cart?.products.length ?? 0}
              </Box>
              {/* {isLoggedIn ? (
                <Image alt="cart" src={Cart.src} width={20} height={20}></Image>
              ) : (
                <DialogAuthCommon>
                  <Image alt="cart" src={Cart.src} width={20} height={20}></Image>
                </DialogAuthCommon>
              )} */}
            </Box>
          </Box>
        </Box>
      </Container>
      <Container
        maxWidth="xl"
        sx={{
          display: { md: 'flex', xs: 'none' },
          justifyContent: 'flex-end'
        }}
      >
        <Box width={277}>
          <TextField
            fullWidth
            placeholder={intl.formatMessage({ id: 'search' })}
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
