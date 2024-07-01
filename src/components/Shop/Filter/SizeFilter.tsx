import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Checkbox, Chip, FormControlLabel, Grid, Paper, Typography, styled } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'store';
import { SizeData } from 'types/shop/shopItem';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5)
}));

interface SizeFilterProps {
  handleChange: (data: string[]) => void;
  init: string[];
}

function SizeFilter({ handleChange, init }: SizeFilterProps) {
  const { size } = useSelector((state) => state.product);
  const [toggle, setToggle] = useState<boolean>(false);
  const [data, setData] = useState<SizeData[]>([]);
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const processDataChange = useCallback(
    (newData: SizeData[]) => {
      const filter = newData.filter((item) => item.checked);
      const itemArray: string[] = [];
      filter.forEach((d) => {
        itemArray.push(d.size);
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
    const formatData: SizeData[] = size.results.map((item) => ({ size: item.product_size_name, id: item.id, checked: false }));
    setData(formatData);
  }, [size]);

  useEffect(() => {
    if (init.length === 0) {
      const formatData: SizeData[] = size.results.map((item) => ({ size: item.product_size_name, id: item.id, checked: false }));
      setData(formatData);
    } else {
      const formatData = size.results.map((item) => {
        if (init.includes(item.product_size_name)) {
          return { size: item.product_size_name, id: item.id, checked: true };
        } else {
          return { size: item.product_size_name, id: item.id, checked: false };
        }
      });
      setData(formatData);
    }
  }, [init, size.results]);

  const showMoreData = useMemo(() => {
    if (isShowMore) return data;
    return data.slice(0, 10);
  }, [data, isShowMore]);

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
          <FormattedMessage id="size" />
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
        {showMoreData.map((d) => (
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
      {!isShowMore && (
        <Button
          sx={{ display: `${!toggle ? 'flex' : 'none'}` }}
          onClick={() => {
            setIsShowMore(true);
          }}
        >
          Show more...
        </Button>
      )}
    </Box>
  );
}

export default SizeFilter;
