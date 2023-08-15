import { useEffect, useState } from 'react';

// material-ui
import { Card, Grid } from '@mui/material';

// project imports
import { gridSpacing } from '../../store/constant';
import ApexBarChart from 'components/forms/chart/Apexchart/ApexBarChart';
import ApexAreaChart from 'components/forms/chart/Apexchart/ApexAreaChart';
import ApexPieChart from 'components/forms/chart/Apexchart/ApexPieChart';
import ApexColumnChart from 'components/forms/chart/Apexchart/ApexColumnChart';
import ApexLineChart from 'components/forms/chart/Apexchart/ApexLineChart';
import ApexMixedChart from 'components/forms/chart/Apexchart/ApexMixedChart';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Card
              sx={{
                padding: '15px'
              }}
            >
              <ApexBarChart></ApexBarChart>
            </Card>
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Card
              sx={{
                padding: '15px'
              }}
            >
              <ApexAreaChart />
            </Card>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <Card
                  sx={{
                    padding: '15px'
                  }}
                >
                  <ApexPieChart />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                padding: '15px'
              }}
            >
              <ApexLineChart />
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                padding: '15px'
              }}
            >
              <ApexMixedChart />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
Dashboard.Layout = 'authGuard';
export default Dashboard;
