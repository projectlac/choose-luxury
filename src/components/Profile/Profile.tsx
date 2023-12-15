import { Box, Card, Container, Divider, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import UserProfile from './UserProfile/UserProfile';
import ChangePassword from './UserProfile/ChangePassword';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      sx={{ width: '100%' }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

function Profile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="xl">
      <Card>
        <Typography fontWeight={500} fontSize={'20px'}>
          Account Setting
        </Typography>
        <Divider sx={{ my: 2 }}></Divider>
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', width: '100%' }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', textAlign: 'left', width: 450 }}
          >
            <Tab
              label="User Profile"
              {...a11yProps(0)}
              sx={{
                alignItems: 'flex-start',
                fontSize: '15px',
                fontWeight: 'bold'
              }}
            />
            {/* <Tab
              label="Billing"
              {...a11yProps(1)}
              sx={{
                alignItems: 'flex-start',
                fontSize: '15px',
                fontWeight: 'bold'
              }}
            /> */}
            <Tab
              label="Change Password"
              {...a11yProps(1)}
              sx={{
                alignItems: 'flex-start',
                fontSize: '15px',
                fontWeight: 'bold'
              }}
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            <UserProfile />
          </TabPanel>
          {/* <TabPanel value={value} index={1}>
            Item Two
          </TabPanel> */}
          <TabPanel value={value} index={1}>
            <ChangePassword />
          </TabPanel>
        </Box>
      </Card>
    </Container>
  );
}

export default Profile;
