import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import AuthLogin from '../auth-forms/AuthLogin';
import { Box, Card, Tab, Tabs, Typography } from '@mui/material';
import AuthRegister from '../auth-forms/AuthRegister';
import ForgotPassword from 'pages/pages/authentication/auth3/forgot-password';

interface IDialogAuthCommon {
  children: React.ReactChild;
}

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
        <Box sx={{ p: { md: 3, xs: 0 } }}>
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

export default function DialogAuthCommon({ children }: IDialogAuthCommon) {
  const [open, setOpen] = React.useState(false);
  const [isForgotMode, setIsForgotMode] = React.useState<boolean>(false);

  const [value, setValue] = React.useState(0);

  const handleChangeMode = React.useCallback((data: boolean) => {
    setIsForgotMode(data);
  }, []);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const toggleTab = (newValue: number) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>{children}</div>
      <Dialog
        sx={{
          '.MuiDialog-paper': {
            margin: '15px'
          }
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ width: { md: '500px', xs: '100%' } }}>
          <Card sx={{ padding: '0 15px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Sign In" {...a11yProps(0)} />
                <Tab label="Sign Up" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {!isForgotMode ? (
                <AuthLogin loginProp={1} handleChangeMode={handleChangeMode} />
              ) : (
                <ForgotPassword handleChangeMode={handleChangeMode} />
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <AuthRegister loginProp={1} toggleTab={toggleTab} />
            </CustomTabPanel>
          </Card>
        </Box>
      </Dialog>
    </div>
  );
}
