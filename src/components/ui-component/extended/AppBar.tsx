import Image from 'next/image';
// material-ui
import {
  Autocomplete,
  Box,
  Container,
  Divider,
  Drawer,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import MessengerChat from 'react-messenger-customer-chat';
// project imports
import MenuIcon from '@mui/icons-material/Menu';
import Cart from '../../../assets/header/cart.png';
import Logo from '../../../assets/header/logo.png';
// assets
import { Logout } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/styles';
import DialogAuthCommon from 'components/authentication/dialog-auth-forms/DialogAuthCommon';
import useAuth from 'hooks/useAuth';
import LocalizationSection from 'layout/MainLayout/Header/LocalizationSection';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import User from './User';
// elevation scroll
import CategoryIcon from '@mui/icons-material/Category';
import _debounce from 'lodash/debounce';
import { IResponseGetProductById } from 'types/services/productApi.types';
import formatMoney from 'utils/formatMoney';
import { getProductWithFilter } from '../../../../api/ProductAPI/productDashboash';
import Script from 'next/script';

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
  const [listItem, setListItem] = useState<IResponseGetProductById[]>([]);
  const [searchKey, setSearchKey] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const { isLoggedIn, logout } = useAuth();
  const dispatch = useDispatch();
  const intl = useIntl();
  const router = useRouter();
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (cart?.products.length) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 1000);
    }
  }, [cart]);

  function handleDebounceFn(inputValue: string) {
    setSearchKey(inputValue);
  }

  const debounceFn = useCallback(_debounce(handleDebounceFn, 500), []);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounceFn(e.target.value);
  };

  const searchProduct = useCallback(async () => {
    const res = await getProductWithFilter({ product_name: searchKey });
    setListItem(res.data.results);
  }, [searchKey]);
  useEffect(() => {
    searchProduct();
  }, [searchProduct]);
  return (
    <Box
      sx={{
        borderBottom: '2px solid rgb(177 140 91)',
        paddingBottom: { md: '30px', xs: 0 }
      }}
    >
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
                  <Link style={{ textDecoration: 'none' }} href="/about-us" target="_blank">
                    <ListItemButton component="a">
                      <ListItemText primary="About us" />
                    </ListItemButton>
                  </Link>
                  <Link style={{ textDecoration: 'none' }} href="/shop" target="_blank">
                    <ListItemButton component="a">
                      <ListItemText primary="Products" />
                    </ListItemButton>
                  </Link>
                  {/* <Link style={{ textDecoration: 'none' }} href="#" target="_blank">
                    <ListItemButton component="a">
                      <ListItemText primary="Fashion trend" />
                    </ListItemButton>
                  </Link> */}
                  <Link style={{ textDecoration: 'none' }} href="/contact-us" target="_blank">
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
            <CustomButton href="/about-us">
              <FormattedMessage id="about-us" />
            </CustomButton>
            <CustomButton href="/shop">
              <FormattedMessage id="shop" />
            </CustomButton>
            {/* <CustomButton href="">Fashion trend</CustomButton> */}
            <CustomButton href="/contact-us">
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
              <>
                <Box onClick={handleClick}>
                  <User />
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0
                      }
                    }
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem
                    onClick={() => {
                      router.push('/checkout?tab=my-order');
                    }}
                  >
                    <ListItemIcon>
                      <CategoryIcon fontSize="small" />
                    </ListItemIcon>
                    My Orders
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      router.push('/profile');
                    }}
                  >
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                      dispatch(
                        openSnackbar({
                          open: true,
                          message: 'Logout successful!',
                          variant: 'alert',
                          alert: {
                            color: 'success'
                          },
                          close: false
                        })
                      );
                      handleClose();
                      router.push('/');
                    }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <DialogAuthCommon>
                <User />
              </DialogAuthCommon>
            )}

            {/* <Box width={20}>
              {isLoggedIn ? (
                <Image alt="wish-list" src={WishList.src} width={20} height={20}></Image>
              ) : (
                <DialogAuthCommon>
                  <Image alt="wish-list" src={WishList.src} width={20} height={20}></Image>
                </DialogAuthCommon>
              )}
            </Box> */}
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
          {/* <TextField
            fullWidth
            placeholder={intl.formatMessage({ id: 'search' })}
            sx={{
              input: {
                background: '#fff',
                color: '#000',
                '&::placeholder': { color: '#000', fontWeight: 'bold', fontSize: '13', opacity: 1 }
              }
            }}
          /> */}

          <Autocomplete
            id="country-select-demo"
            sx={{ width: 277 }}
            options={listItem}
            autoHighlight
            disableClearable
            getOptionLabel={(option) => option.product_name}
            renderOption={(props, option) => (
              <Link href={`/product-detail/${option.id}`} style={{ textDecoration: 'none' }}>
                <Box component="li" {...props}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: 50,
                      height: 50,
                      mr: 1
                    }}
                  >
                    <Image alt={option.product_name} src={option.images[0]?.product_img} layout="fill" objectFit="cover"></Image>
                  </Box>
                  <Typography
                    sx={{
                      width: 'calc(100% - 70px)',
                      color: '#000'
                    }}
                    fontSize={13}
                  >
                    {option.product_name}
                    <Divider />
                    <i> {formatMoney(option.base_price)} VNĐ</i>
                  </Typography>
                </Box>
              </Link>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={intl.formatMessage({ id: 'search' })}
                onChange={handleChangeSearch}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password' // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Box>
        <Box
          sx={{
            '.zalo-chat-widget': {
              right: '23px !important',
              bottom: '100px !important'
            }
          }}
        >
          <div
            className="zalo-chat-widget"
            data-oaid="3863536650460330247"
            data-welcome-message="Rất vui khi được hỗ trợ bạn!"
            data-autopopup="0"
            data-width=""
            data-height=""
          ></div>
        </Box>
        <Script src="https://sp.zalo.me/plugins/sdk.js"></Script>
      </Container>
      <MessengerChat pageId="709527266077097" language="vi_VN" greetingDialogDisplay="show" />
    </Box>
  );
};

export default AppBar;
