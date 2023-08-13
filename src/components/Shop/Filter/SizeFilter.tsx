import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { SizeData } from 'types/shop/shopItem';

function SizeFilter() {
  const [data, setData] = useState<SizeData[]>([
    { size: 'XXS', checked: false, id: '1' },
    { size: 'XS', checked: false, id: '2' },
    { size: 'S', checked: false, id: '31' },
    { size: 'M', checked: false, id: '4' },
    { size: 'L', checked: false, id: '51' },
    { size: 'XL', checked: false, id: '61' },
    { size: 'XXL', checked: false, id: '7' },
    { size: '0', checked: false, id: '3' },
    { size: 'one size', checked: false, id: '8' }
  ]);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const temp = [...data];
    const index = data.findIndex((d) => d.id === id);
    temp[index].checked = e.target.checked;
    setData(temp);
  };

  return (
    <Box>
      <Box display={'flex'} alignItems={'center'} sx={{ marginBottom: '15px' }} justifyContent={'space-between'}>
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: '400',
            lineHeight: '16px',
            color: '#000',
            marginRight: '32px'
          }}
        >
          Size
        </Typography>
        <ArrowForwardIosIcon sx={{ color: '#000', transform: 'rotate(90deg)' }} />
      </Box>
      <Grid container>
        {data.map((d) => (
          <Grid item sm={6} key={d.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={d.checked}
                  onChange={(e) => {
                    handleCheck(e, d.id);
                  }}
                  sx={{
                    color: 'rgba(169, 169, 169, 1)',
                    '&.Mui-checked': {
                      color: 'rgba(169, 169, 169, 1)'
                    },
                    fontSize: '4px',
                    borderWidth: '1px',
                    '&.MuiCheckbox-root': {
                      padding: '9px 4px'
                    },
                    svg: {
                      width: '21px',
                      height: '22px',
                      stroke: '#fff'
                    }
                  }}
                />
              }
              label={d.size}
              sx={{
                '.MuiTypography-root': {
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '14px',
                  color: '#000',
                  marginTop: '2px'
                },
                height: '30px',
                marginLeft: '15px',
                alignItems: 'center'
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SizeFilter;
