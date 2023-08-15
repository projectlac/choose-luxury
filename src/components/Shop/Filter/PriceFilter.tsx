import { Box, FormControl, InputAdornment, OutlinedInput, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PrettoSlider = styled(Slider)({
  color: '#000',
  marginBottom: '15px',
  height: 5,
  '& .MuiSlider-track': {
    border: 'none'
  },
  '& .MuiSlider-thumb': {
    height: 12,
    width: 12,
    backgroundColor: '#000',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit'
    },
    '&:before': {
      display: 'none'
    }
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)'
    },
    '& > *': {
      transform: 'rotate(45deg)'
    }
  }
});

function PriceFilter() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [value, setValue] = React.useState<number[]>([0, 52000000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const fetch = (newValue: number | number[]) => {
    console.log(newValue);
  };

  const changeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp = [...value];
    temp[0] = +e.target.value;
    setValue(temp);
  };

  const changeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp = [...value];
    temp[1] = +e.target.value;
    setValue(temp);
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
          Price
        </Typography>
        <ArrowForwardIosIcon
          sx={{ color: '#000', transition: 'all 0.2s', transform: `${toggle ? 'rotate(0deg)' : 'rotate(90deg)'}` }}
          onClick={() => {
            setToggle(!toggle);
          }}
        />
      </Box>
      <Box display={`${!toggle ? 'block' : 'none'}`}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          sx={{
            input: {
              padding: '5px 7px',
              '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: '0'
              }
            }
          }}
        >
          <FormControl sx={{ width: '120px' }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={<InputAdornment position="end">d</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              value={value[0]}
              type="number"
              onChange={changeStart}
            />
          </FormControl>{' '}
          <FormControl sx={{ width: '120px' }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={<InputAdornment position="end">d</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              value={value[1]}
              type="number"
              onChange={changeEnd}
            />
          </FormControl>
        </Box>
        <PrettoSlider value={value} min={0} max={52000000} onChange={handleChange} onChangeCommitted={(_, newValue) => fetch(newValue)} />
      </Box>
    </Box>
  );
}

export default PriceFilter;
