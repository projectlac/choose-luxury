import { Box, Container, Divider, Grid, Typography, styled } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useIntl } from 'react-intl';

import FacebookIcon from '../../assets/footer/facebook.png';
import InstagramIcon from '../../assets/footer/instagram.png';
import shoppee from '../../assets/footer/logo-shopee.png';
import tiktok from '../../assets/footer/tiktok.png';
import zalo from '../../assets/footer/zalo.png';
import MailerSubscriber from 'components/maintenance/ComingSoon/ComingSoon1/MailerSubscriber';
import MailerSubscriberContact from 'components/maintenance/ComingSoon/ComingSoon1/MailerSubscriberContact';

const Detail = styled(Typography)(({ theme }) => ({
  color: '#000',
  fontSize: '17px',
  lineHeight: '1.7'
}));

function ContactUs() {
  const intl = useIntl();
  return (
    <Container maxWidth="xl">
      <Box mt={3}>
        <Grid container columnSpacing={4}>
          <Grid item md={6}>
            <Typography variant="h1">{`${intl.formatMessage({ id: 'address' })}`}</Typography>
            <Box mt={2}>
              <Detail>
                Central 3, Vinhome central park, <br /> 252 Nguyen Huu Canh street, Ward 22, <br /> Binh Thanh district, HCM
              </Detail>
              <Divider sx={{ my: 1 }}></Divider>
              <Detail>
                {`${intl.formatMessage({ id: 'phone-number' })}`}: <a href="tel:+84908796994">0908796994</a>
              </Detail>
              <Divider sx={{ my: 1 }}></Divider>
              <Detail>
                Link nhóm sỉ lẻ: <br />
                <a href="https://zalo.me/g/ojzsuc427" target="_blank" rel="noopener noreferrer">
                  https://zalo.me/g/ojzsuc427
                </a>
              </Detail>
            </Box>
            <Typography variant="h1" mt={2}>{`${intl.formatMessage({ id: 'follow-us' })}`}</Typography>
            <Box
              sx={{
                mt: 3,
                a: {
                  marginRight: '15px'
                }
              }}
            >
              <a href="https://www.facebook.com/chooseluxretail" target="_blank" rel="noopener noreferrer">
                <Image src={FacebookIcon.src} alt="facebook" width={30} height={30}></Image>
              </a>
              <a href="https://www.instagram.com/chooseluxauth" target="_blank" rel="noopener noreferrer">
                <Image src={InstagramIcon.src} alt="instargram" width={30} height={30}></Image>
              </a>
              <a href="https://shopee.vn/chooseyours.closet" target="_blank" rel="noopener noreferrer">
                <Image src={shoppee.src} alt="twitter" width={30} height={30}></Image>
              </a>
              <a href="https://www.tiktok.com/@chooseyours.closet" target="_blank" rel="noopener noreferrer">
                <Image src={tiktok.src} alt="twitter" width={30} height={30}></Image>
              </a>
              <a href="https://zalo.me/3863536650460330247" target="_blank" rel="noopener noreferrer">
                <Image src={zalo.src} alt="twitter" width={30} height={30}></Image>
              </a>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Typography variant="h1">{`${intl.formatMessage({ id: 'contact-form' })}`}</Typography>
            <Box mt={3}>
              <MailerSubscriberContact />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ContactUs;
