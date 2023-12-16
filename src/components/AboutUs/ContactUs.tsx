import { Box, Container, Typography } from '@mui/material';
import React from 'react';

function ContactUs() {
  return (
    <Container maxWidth="xl">
      <Box>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 17,
            lineHeight: '24px',
            marginBottom: '15px',
            textAlign: 'center'
          }}
        >
          Chào mừng bạn đến với chooselux. KB vào tường zalo shop xem hàng mới mỗi ngày nhé. <br /> Chúng mình đang có chương trình giảm
          150k cho khách hàng follow các kênh của Choose
        </Typography>
        <Box>
          <Box
            sx={{
              marginLeft: '25px'
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 17,
                lineHeight: '24px',
                marginBottom: '15px'
              }}
            >
              ❤️FB:{' '}
              <a href="https://www.facebook.com/chooseluxretail" target="_blank" rel="noopener noreferrer">
                https://www.facebook.com/chooseluxretail
              </a>
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 17,
                lineHeight: '24px',
                marginBottom: '15px'
              }}
            >
              ❤️IG: @clux.vn - @chooseluxauth
            </Typography>{' '}
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 17,
                lineHeight: '24px',
                marginBottom: '15px'
              }}
            >
              ❤️Website:{' '}
              <a href="https://chooselux.vn" target="_blank" rel="noopener noreferrer">
                chooselux.vn
              </a>
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 17,
                lineHeight: '24px',
                marginBottom: '15px'
              }}
            >
              ❤️ SP:{' '}
              <a href="https://shopee.vn/chooseyours.closet" target="_blank" rel="noopener noreferrer">
                shopee.vn/chooseyours.closet
              </a>
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 17,
                lineHeight: '24px',
                marginBottom: '15px'
              }}
            >
              ❤️ Toptop:{' '}
              <a href="https://www.tiktok.com/@chooseyours.closet" target="_blank" rel="noopener noreferrer">
                https://www.tiktok.com/@chooseyours.closet
              </a>
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 17,
                lineHeight: '24px',
                marginBottom: '15px'
              }}
            >
              ❤️ Official account:{' '}
              <a href="https://zalo.me/3863536650460330247" target="_blank" rel="noopener noreferrer">
                https://zalo.me/3863536650460330247
              </a>
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 17,
                lineHeight: '24px',
                marginBottom: '15px'
              }}
            >
              ❤️ Phone: <a href="tel:0908796994">0908796994</a>
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 17,
                lineHeight: '24px',
                marginBottom: '15px'
              }}
            >
              ❤️ Link nhóm sỉ lẻ:{' '}
              <a href="https://zalo.me/g/ojzsuc427" target="_blank" rel="noopener noreferrer">
                https://zalo.me/g/ojzsuc427
              </a>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default ContactUs;
