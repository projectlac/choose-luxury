import React, { useCallback, useEffect, useMemo, useState } from 'react';
import orderAPI from '../../../api/OrderAPI/OrderAPI';
import { IResponseGetMyOrder } from 'types/services/cartApi.types';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Link, Stack, Typography, styled } from '@mui/material';
import { useDispatch } from 'store';
import { hiddenLoading, showLoading } from 'store/slices/loading';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useIntl } from 'react-intl';
import useAuth from 'hooks/useAuth';
import DialogAuthCommon from 'components/authentication/dialog-auth-forms/DialogAuthCommon';
import Image from 'next/image';
import formatMoney from 'utils/formatMoney';
import { getStatusLabel } from 'utils/convert';

const CustomButton = styled(Button)(({ theme }) => ({
  width: '180px',
  height: '46px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(191, 140, 10, 1)',
  fontFamily: 'Open Sans',
  fontSize: '16px',
  fontWeight: '700',
  lineHeight: '27px',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgb(151 111 8)'
  },
  [theme.breakpoints.down('md')]: {
    width: '30%',
    fontSize: '15px',
    height: '35px'
  }
}));

function OrderItem({ data }: { data: IResponseGetMyOrder }) {
  const intl = useIntl();
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      sx={{
        '&.MuiPaper-root.MuiAccordion-root.Mui-expanded': {
          margin: 0
        },

        '&.MuiPaper-root.MuiAccordion-root:before': {
          height: '0'
        },
        '& .MuiAccordionSummary-content': {
          margin: 0,
          '&.Mui-expanded': {
            margin: 0
          }
        }
      }}
    >
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Box
          sx={{
            width: '100%',
            border: '1px solid #ededed',
            borderRadius: '8px',
            marginBottom: '5px',
            // boxShadow: '0px 1px 7px 0.5px #ddddddc4',
            padding: '10px 15px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Grid container>
            <Grid item md={6} xs={12}>
              <Box>
                <Box
                  width={200}
                  mb={1}
                  sx={{
                    span: {
                      fontWeight: 'bold'
                    }
                  }}
                >
                  <span>{`${intl.formatMessage({ id: 'order-code' })}`}: </span> {data.order.order_code}
                </Box>
                <Box
                  width={250}
                  sx={{
                    span: {
                      fontWeight: 'bold'
                    },
                    mb: { xs: 1, md: 0 }
                  }}
                >
                  <span>{`${intl.formatMessage({ id: 'total-price' })}`}: </span>
                  {formatMoney(data.order.totalPrice.toString())} VNĐ
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box
                sx={{
                  span: {
                    fontWeight: 'bold'
                  },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      marginBottom: '8px'
                    }}
                  >
                    <span>{`${intl.formatMessage({ id: 'status' })}`}: </span>{' '}
                    <span style={{ color: getStatusLabel(data.order.status).color }}> {getStatusLabel(data.order.status).text}</span>
                  </Typography>
                  <Typography
                    sx={{
                      mb: { xs: 1, md: 0 }
                    }}
                  >
                    <span>{`${intl.formatMessage({ id: 'number-of-product' })}`}:</span> {data.order.numProducts}
                  </Typography>
                </Box>
                <Box>
                  <KeyboardArrowDownIcon
                    sx={{
                      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'all 0.2s',
                      marginLeft: '15px'
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {data.items.map((item) => (
          <Stack key={item.id} direction={'row'}>
            {item.product_img && (
              <Link href={`/product-detail/${item.product}`}>
                <a target="__blank">
                  <Box
                    width={100}
                    height={110}
                    sx={{
                      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                      borderRadius: '5px',

                      position: 'relative'
                    }}
                  >
                    <Image src={item.product_img} alt="Order Complete" layout="fill" />
                  </Box>
                </a>
              </Link>
            )}

            <Box
              ml={3}
              sx={{
                width: 'calc(100% - 150px)'
              }}
            >
              <Typography sx={{ mb: 1, a: { color: '#000', textDecoration: 'none' } }}>
                <b>{`${intl.formatMessage({ id: 'product' })}`}:</b>{' '}
                <Link href={`/product-detail/${item.product}`}>
                  <a target="__blank">{item.product_name}</a>
                </Link>
              </Typography>
              <Typography sx={{ mb: 1, a: { color: '#000', textDecoration: 'none' } }}>
                <b>{`${intl.formatMessage({ id: 'price' })}`}:</b> {formatMoney(item.price.toString())} VNĐ
              </Typography>
              <Typography sx={{ mb: 1, a: { color: '#000', textDecoration: 'none' } }}>
                <b>{`${intl.formatMessage({ id: 'quantity' })}`}: </b>
                {item.qty}
              </Typography>
            </Box>
          </Stack>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

function YourOrder() {
  const [listOrder, setListOrder] = useState<IResponseGetMyOrder[]>([]);
  const intl = useIntl();
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();

  const getListOrder = useCallback(async () => {
    // const res = await orderAPI.getListOrderByAdmin();
    try {
      setLoading(true);
      dispatch(showLoading());
      const res = await orderAPI.myOrder();
      setListOrder(res.data.data);
    } catch (error) {
    } finally {
      dispatch(hiddenLoading());
      setLoading(false);
    }
    // console.log(res);
  }, [dispatch]);

  useEffect(() => {
    getListOrder();
  }, [getListOrder]);

  return (
    <div>
      {isLoggedIn ? (
        <>
          {!loading && (
            <>
              {listOrder.length === 0 ? (
                <Box>{`You don't have order`}</Box>
              ) : (
                <Box>
                  {listOrder.map((item, index) => (
                    <OrderItem key={index} data={item} />
                  ))}
                </Box>
              )}
            </>
          )}
        </>
      ) : (
        <Box>
          <DialogAuthCommon>
            <CustomButton>{`${intl.formatMessage({ id: 'login' })}`}</CustomButton>
          </DialogAuthCommon>
        </Box>
      )}
    </div>
  );
}

export default YourOrder;
