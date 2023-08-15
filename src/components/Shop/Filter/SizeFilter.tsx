import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Checkbox, Chip, FormControlLabel, Grid, Paper, Typography, styled } from '@mui/material';
import React, { useState } from 'react';
import { SizeData } from 'types/shop/shopItem';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5)
}));

function SizeFilter() {
  const [toggle, setToggle] = useState<boolean>(false);
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

  const handleDelete = (id: string) => () => {
    const temp = [...data];
    const index = data.findIndex((d) => d.id === id);
    temp[index].checked = !temp[index].checked;
    setData(temp);
  };

  const renderChipData = data.filter((d) => d.checked);

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
            fontWeight: '600',
            lineHeight: '16px',
            color: '#000',
            marginRight: '32px',
            fontFamily: 'Quicksand'
          }}
        >
          Size
        </Typography>
        <ArrowForwardIosIcon
          sx={{ color: '#000', transition: 'all 0.2s', transform: `${toggle ? 'rotate(0deg)' : 'rotate(90deg)'}` }}
          onClick={() => {
            setToggle(!toggle);
          }}
        />
      </Box>
      {renderChipData.length > 0 && (
        <Paper
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 0.5,
            m: 0
          }}
          component="ul"
        >
          {renderChipData.map((f: SizeData) => {
            return (
              <ListItem key={`${f.id}213`}>
                <Chip
                  label={f.size}
                  onDelete={handleDelete(f.id)}
                  sx={{
                    fontFamily: 'Quicksand',
                    color: '#fff',
                    svg: {
                      fontSize: '17px !important'
                    },
                    span: {
                      paddingLeft: '7px'
                    },
                    backgroundColor: '#b49151',
                    borderRadius: '4px',
                    height: '22px',
                    fontSize: '12px'
                  }}
                />
              </ListItem>
            );
          })}
        </Paper>
      )}
      <Grid container display={`${!toggle ? 'flex' : 'none'}`}>
        {data.map((d) => (
          <Grid item xs={6} key={d.id}>
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
