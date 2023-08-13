import React from 'react';
import { useRouter } from 'next/router';
import { Breadcrumbs as BC, Box, Container, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from 'assets/breadcrumbs/home.png';
import Image from 'next/image';
function Breadcrumbs() {
  const router = useRouter();

  console.log(router);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="rgba(100, 171, 9, 1)" href="/">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ marginRight: '13px', marginLeft: '10px' }}>
          <Image src={HomeIcon.src} alt="home-icon" width="22px" height="24px"></Image>
        </Box>
        Homepage
      </Box>
    </Link>,
    <Typography key="3" color="text.primary" sx={{ textTransform: 'capitalize', color: '#000' }}>
      {router.query.shopCategory}
    </Typography>
  ];

  return (
    <Container>
      <BC separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ marginTop: '19px', marginBottom: '28px' }}>
        {breadcrumbs}
      </BC>
    </Container>
  );
}

export default Breadcrumbs;
