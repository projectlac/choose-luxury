import { Box, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import authApi from '../../../../api/AuthenticationApi/AuthApi';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

function ActivateAccount() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [time, setTime] = useState<number>(3);
  const dispatch = useDispatch();
  const { uid, token } = router.query;
  const fetchApi = useCallback(async () => {
    if (uid && token) {
      try {
        await authApi.activeAccount({ uid: uid as string, token: token as string });
        setLoading(false);
        setIsActive(true);
      } catch (error) {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Something failed',
            variant: 'alert',
            alert: {
              color: 'error'
            },

            severity: 'error',
            close: false
          })
        );
        setIsError(true);
      }
    }
  }, [dispatch, token, uid]);

  useEffect(() => {
    if (isActive) {
      const dm = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);

      return function cleanup() {
        clearInterval(dm);
      };
    }
  }, [isActive, router]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  useEffect(() => {
    if (time === 0) {
      router.push('/');
    }
  }, [router, time]);
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh'
      }}
    >
      <Box
        sx={{
          width: 350,
          height: 350,
          position: 'fixed',
          top: '50%',
          transform: 'translateY(-50%)',
          left: 0,
          right: 0,
          margin: '0 auto',
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0px 0px 5px 1px #ddd'
        }}
      >
        <Typography textAlign={'center'} fontSize={'20px'} fontWeight={'bold'}>
          Activate account
        </Typography>
        <Box
          sx={{
            height: 'calc(100% - 30px)',
            width: '320px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isError ? (
            <Box>Có lỗi xảy ra, vui lòng thử lại sau</Box>
          ) : (
            <>
              {loading ? (
                <CircularProgress />
              ) : (
                <Box>
                  {isActive && (
                    <Box textAlign={'center'}>
                      <Typography fontSize={'15px'} fontWeight={'bold'}>
                        Tài khoản của bạn đã được kích hoạt. Vui lòng đợi điều hướng sau:
                      </Typography>
                      <Box>
                        <Typography fontSize={'30px'} fontWeight={'bold'}>
                          {time}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ActivateAccount;
