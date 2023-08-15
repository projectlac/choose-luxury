import { Box, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
interface ProductFilterDataChild {
  id: string;
  name: string;
  url: string;
}
interface ProductFilterData {
  id: string;
  name: string;
  url: string;
  child?: ProductFilterDataChild[];
}
const data: ProductFilterData[] = [
  {
    id: '123',
    name: `Men’s shoes`,
    url: '/',
    child: [
      { id: '1', name: `Men’s shoes1`, url: '/' },
      { id: '12', name: `Men’s shoes1`, url: '/' },
      { id: '23', name: `Men’s shoes1`, url: '/' },
      { id: '13', name: `Men’s shoes1`, url: '/' }
    ]
  },
  {
    id: '1233',
    name: `Men’s appearance `,
    url: '/',
    child: [
      { id: '1123', name: `Men’s appearance1`, url: '/' },
      { id: '1223', name: `Men’s appearance1`, url: '/' },
      { id: '1323', name: `Men’s appearance1`, url: '/' },
      { id: '1243', name: `Men’s appearance1`, url: '/' }
    ]
  },
  {
    id: '1231',
    name: ` Men’s accessories`,
    url: '/'
  }
];

function ProductFilter() {
  const router = useRouter();
  const [toggle, setToggle] = useState<boolean>(false);
  const [categorySelection, setCategorySelection] = useState<string>('');
  const showChildCategory = useCallback(
    (id: string) => {
      const category = data.find((d) => d.id === id);

      if (!category?.child || category?.child?.length === 0) {
        router.push(category?.url ?? '/');
      } else {
        setCategorySelection(id);
      }
    },
    [router]
  );
  const renderCurrentCategory = useMemo(() => {
    const category = data.find((d) => d.id === categorySelection);

    if (category) return category.name;
    return '';
  }, [categorySelection]);
  return (
    <Box sx={{ marginBottom: '15px' }}>
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
          Product
        </Typography>
        <ArrowForwardIosIcon
          sx={{ color: '#000', transition: 'all 0.2s', transform: `${toggle ? 'rotate(0deg)' : 'rotate(90deg)'}` }}
          onClick={() => {
            setToggle(!toggle);
          }}
        />
      </Box>
      <Box
        display={`${!toggle ? 'block' : 'none'}`}
        sx={{
          marginBottom: '25px'
        }}
      >
        <Box
          sx={{
            display: !categorySelection.trim() ? 'none' : 'flex',
            fontSize: '17px',
            fontWeight: '600',
            color: '#000',
            alignItems: 'center',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
          onClick={() => {
            setCategorySelection('');
          }}
        >
          {renderCurrentCategory} <ArrowLeftIcon />
        </Box>
        {data.map((d) => (
          <div key={d.id}>
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: '400',
                lineHeight: '14px',
                color: '#000',
                marginBottom: '15px',
                cursor: 'pointer',
                display: categorySelection.trim() ? 'none' : 'block'
              }}
              onClick={() => showChildCategory(d.id)}
            >
              {d.name}
            </Typography>

            {(d.child || []).map((ch) => (
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: '400',
                  lineHeight: '14px',
                  color: '#000',
                  marginBottom: '15px',
                  cursor: 'pointer',
                  display: categorySelection.trim() && d.id === categorySelection ? 'block' : 'none'
                }}
                key={ch.id}
              >
                {ch.name}
              </Typography>
            ))}
          </div>
        ))}
      </Box>
    </Box>
  );
}

export default ProductFilter;
