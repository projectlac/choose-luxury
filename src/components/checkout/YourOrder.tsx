import React, { useCallback, useEffect, useMemo, useState } from 'react';
import orderAPI from '../../../api/OrderAPI/OrderAPI';
import { IResponseGetMyOrder } from 'types/services/cartApi.types';
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from '@mui/material';
import { useDispatch } from 'store';
import { hiddenLoading, showLoading } from 'store/slices/loading';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useIntl } from 'react-intl';
function OrderItem({ data }: { data: IResponseGetMyOrder }) {
  const intl = useIntl();
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

  const numberOfProducts = useMemo(() => {
    let count = 0;
    data.orderItems.forEach((item) => {
      count += item.qty;
    });
    return count;
  }, [data.orderItems]);
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
            boxShadow: '0px 1px 7px 0.5px #ddddddc4',
            padding: '10px 15px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Box>
            <Box
              width={150}
              mb={1}
              sx={{
                span: {
                  fontWeight: 'bold'
                }
              }}
            >
              <span>{`${intl.formatMessage({ id: 'status' })}`}:</span> {data.status}
            </Box>
            <Box
              width={250}
              sx={{
                span: {
                  fontWeight: 'bold'
                }
              }}
            >
              <span>{`${intl.formatMessage({ id: 'total-price' })}`}: </span>
              {data.totalPrice} VNĐ
            </Box>
          </Box>
          <Box
            sx={{
              span: {
                fontWeight: 'bold'
              },
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography>
              <span>{`${intl.formatMessage({ id: 'number-of-product' })}`}:</span> {numberOfProducts}
            </Typography>
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
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {data.orderItems.map((item) => (
          <Stack key={item.id} direction={'row'}>
            <Box
              width={100}
              height={110}
              sx={{
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                borderRadius: '5px'
              }}
            >
              Image
            </Box>

            <Box ml={3}>
              <Typography>
                <b>{`${intl.formatMessage({ id: 'product' })}`}:</b> {item.product}
              </Typography>
              <Typography>
                <b>{`${intl.formatMessage({ id: 'price' })}`}:</b> {item.price} VNĐ
              </Typography>
              <Typography>
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
  const [data, setData] = useState<IResponseGetMyOrder[]>();
  const dispatch = useDispatch();

  const getListOrder = useCallback(async () => {
    // const res = await orderAPI.getListOrderByAdmin();
    try {
      dispatch(showLoading());
      const res = await orderAPI.myOrder();
      setData(res.data);
    } catch (error) {
    } finally {
      dispatch(hiddenLoading());
    }
    // console.log(res);
  }, [dispatch]);

  useEffect(() => {
    getListOrder();
  }, [getListOrder]);

  return (
    <div>
      {data?.map((item) => (
        <OrderItem key={item.id} data={item} />
      ))}
    </div>
  );
}

export default YourOrder;
