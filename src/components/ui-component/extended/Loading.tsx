import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { useSelector } from 'store';

function Loading() {
  const { loading } = useSelector((state) => state.loading);
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: '9999',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff59',
        display: loading ? 'flex' : 'none'
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loading;
