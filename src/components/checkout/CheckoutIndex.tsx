import { Box, Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import ListCheckout from './ListCheckout';
import CheckoutDetail from './CheckoutDetail';
import { useCallback, useEffect, useState } from 'react';
import YourOrder from './YourOrder';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ py: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function CheckoutIndex() {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const { tab } = router.query;
  const intl = useIntl();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleToggle = (data: number) => {
    setValue(data);
  };

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handlePrice = useCallback((data: number) => {
    setTotalPrice(data);
  }, []);

  useEffect(() => {
    if (tab === 'my-order') {
      setValue(1);
    }
  }, [router, tab]);
  return (
    <Container maxWidth="xl">
      <Grid container rowSpacing={3}>
        <Grid item md={12} xs={12}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label={`${intl.formatMessage({ id: 'cart' })}`} {...a11yProps(0)} />
                <Tab label={`${intl.formatMessage({ id: 'your-order' })}`} {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <ListCheckout handlePrice={handlePrice} totalPrice={totalPrice} handleToggle={handleToggle} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <YourOrder />
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CheckoutIndex;
