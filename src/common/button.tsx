import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const CustomButton = styled(Button)(({ theme }) => ({
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
