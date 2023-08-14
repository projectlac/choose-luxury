import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface BrandData {
  brand: string;
  checked: boolean;
  id: string;
}

function BrandFilter() {
  const [toggle, setToggle] = useState<boolean>(false);

  const [data, setData] = useState<BrandData[]>([
    { brand: 'ALEXANDER MCQUEEN', checked: false, id: '1' },
    { brand: 'ALEXANDER MCQUEEN', checked: false, id: '2' },
    { brand: 'ALEXANDER MCQUEEN', checked: false, id: '31' },
    { brand: 'ALEXANDER MCQUEEN', checked: false, id: '4' },
    { brand: 'ALEXANDER MCQUEEN', checked: false, id: '51' },
    { brand: 'ALEXANDER MCQUEEN', checked: false, id: '61' },
    { brand: 'ALEXANDER MCQUEEN', checked: false, id: '7' },
    { brand: 'ALEXANDER MCQUEEN', checked: false, id: '3' },
    { brand: 'ALEXANDER MCQUEEN', checked: false, id: '8' }
  ]);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const temp = [...data];
    const index = data.findIndex((d) => d.id === id);
    temp[index].checked = e.target.checked;
    setData(temp);
  };

  return (
    <Box>
      <Box display={'flex'} alignItems={'center'} sx={{ marginBottom: '15px', mt: 2 }} justifyContent={'space-between'}>
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: '400',
            lineHeight: '16px',
            color: '#000',
            marginRight: '32px'
          }}
        >
          Brand
        </Typography>
        <ArrowForwardIosIcon
          sx={{ color: '#000', transition: 'all 0.2s', transform: `${toggle ? 'rotate(0deg)' : 'rotate(90deg)'}` }}
          onClick={() => {
            setToggle(!toggle);
          }}
        />
      </Box>
      <Grid container display={`${!toggle ? 'flex' : 'none'}`}>
        {data.map((d) => (
          <Grid item sm={12} key={d.id}>
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
              label={d.brand}
              sx={{
                '.MuiTypography-root': {
                  fontSize: '14px',
                  fontWeight: '400',
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

export default BrandFilter;
