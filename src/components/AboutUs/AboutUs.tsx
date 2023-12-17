import { Box, Container, Grid, Typography } from '@mui/material';
import MailerSubscriberContact from 'components/maintenance/ComingSoon/ComingSoon1/MailerSubscriberContact';
import React from 'react';
import { useIntl } from 'react-intl';

function AboutUs() {
  const intl = useIntl();
  return (
    <Container maxWidth="xl">
      <Box>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 25,
            marginBottom: '30px'
          }}
          textAlign={'center'}
        >
          🌿VỀ CHOOSE 🌿
        </Typography>
        <Box>
          <Typography
            sx={{
              fontWeight: 500,
              textAlign: 'justify',
              fontSize: 17
            }}
          >
            Choose Lux Group chuyên mảng:
          </Typography>
          <br />
          <Box>
            <Grid container spacing={5}>
              <Grid item md={3} xs={12}>
                <Box
                  m={2}
                  p={3}
                  sx={{
                    border: '1px dashed #d33',
                    minHeight: 240
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      textAlign: 'justify',
                      fontSize: 17,
                      lineHeight: '24px',
                      marginBottom: '15px'
                    }}
                  >
                    💯 Pick up - Order hàng chính hãng new store/ outlet US-EU đầy đủ bill box bao auth trọn đời, cam kết giá gốc cho seller
                    khách lẻ rẻ hơn store VN và web lên tới 80% đặc biệt với các đợt private sale hoặc pick outlet.
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={3} xs={12}>
                <Box
                  m={2}
                  p={3}
                  sx={{
                    border: '1px dashed #d33',
                    minHeight: 240
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      textAlign: 'justify',
                      fontSize: 17,
                      lineHeight: '24px',
                      marginBottom: '15px'
                    }}
                  >
                    💯 2hand - Hàng authentic used good like new kèm giấy check entrupy kiểm định auth, giá bằng 1/5-1/10 mua auth new.
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={3} xs={12}>
                <Box
                  m={2}
                  p={3}
                  sx={{
                    border: '1px dashed #d33',
                    minHeight: 240
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      textAlign: 'justify',
                      fontSize: 17,
                      lineHeight: '24px',
                      marginBottom: '15px'
                    }}
                  >
                    💯 Nhận thu mua - ký gửi - trao đổi các sản phẩm đã check authentic mua từ shop hoặc store kèm giấy tờ, kiểm định.
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={3} xs={12}>
                <Box
                  m={2}
                  p={3}
                  sx={{
                    border: '1px dashed #d33',
                    minHeight: 240
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      textAlign: 'justify',
                      fontSize: 17,
                      lineHeight: '24px',
                      marginBottom: '15px'
                    }}
                  >
                    💯 Khui kiện âu 2hand từ pháp ý tbn với tỉ lệ check auth etp cao nhất, detail và visual auth bao xách nước ngoài với giá
                    thành chỉ từ vài triệu so với mua new.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <br />
          <Typography
            sx={{
              fontWeight: 500,
              textAlign: 'justify',
              fontSize: 17,
              lineHeight: '24px'
            }}
          >
            Với hơn 5 năm kinh nghiệm pick up store với hàng chục ngàn đơn hàng mỗi năm và vô vàn feedback, giao dịch legit check, Choose
            luôn cam kết uy tín và chất lượng sản phẩm mang đến cho mọi khách hàng 🌷.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default AboutUs;
