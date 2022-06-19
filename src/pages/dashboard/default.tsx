import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from '../../store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            huhuhu
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            huhuhu
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                huhuhu
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                huhuhu
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            huhuhu
          </Grid>
          <Grid item xs={12} md={4}>
            huhuhu
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
Dashboard.Layout = 'authGuard';
export default Dashboard;
