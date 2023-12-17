import { Box, Checkbox, Chip, FormControlLabel, Grid, Paper, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/system';
import { useSelector } from 'store';
import { FormattedMessage } from 'react-intl';

interface BrandData {
  brand: string;
  checked: boolean;
  id: number;
}
const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5)
}));

interface BrandFilterProps {
  handleChange: (data: string[]) => void;
  init: string[];
}

function BrandFilter({ handleChange, init }: BrandFilterProps) {
  const [toggle, setToggle] = useState<boolean>(false);
  const { brand } = useSelector((state) => state.product);

  const [data, setData] = useState<BrandData[]>([]);

  const processDataChange = useCallback(
    (newData: BrandData[]) => {
      const filter = newData.filter((item) => item.checked);
      const itemArray: string[] = [];
      filter.forEach((d) => {
        itemArray.push(d.brand);
      });

      handleChange(itemArray);
    },
    [handleChange]
  );

  const handleDelete = (id: number) => () => {
    const temp = [...data];
    const index = data.findIndex((d) => d.id === id);
    temp[index].checked = !temp[index].checked;
    setData(temp);
    processDataChange(temp);
  };

  const renderChipData = data.filter((d) => d.checked);
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const temp = [...data];
    const index = data.findIndex((d) => d.id === id);
    temp[index].checked = e.target.checked;
    setData(temp);
    processDataChange(temp);
  };

  useEffect(() => {
    if (init.length === 0) {
      const formatData: BrandData[] = brand.results.map((item) => ({ brand: item.product_brand_name, id: item.id, checked: false }));
      setData(formatData);
    } else {
      const formatData = brand.results.map((item) => {
        if (init.includes(item.product_brand_name)) {
          return { brand: item.product_brand_name, id: item.id, checked: true };
        } else {
          return { brand: item.product_brand_name, id: item.id, checked: false };
        }
      });
      setData(formatData);
    }
  }, [brand, init]);

  return (
    <Box>
      <Box display={'flex'} alignItems={'center'} sx={{ marginBottom: '15px', mt: 2 }} justifyContent={'space-between'}>
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
          <FormattedMessage id="brand" />
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
          {renderChipData.map((f: BrandData) => {
            return (
              <ListItem key={`${f.id}213`}>
                <Chip
                  label={f.brand}
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
