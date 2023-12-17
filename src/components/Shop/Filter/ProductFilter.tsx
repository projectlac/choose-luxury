import { Box, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useSelector } from 'store';
import { ICategoryFilter } from 'types/services/categoryApi.types';
import { FormattedMessage } from 'react-intl';
// interface ProductFilterDataChild {
//   id: string;
//   name: string;
//   url: string;
// }
// interface ProductFilterData {
//   id: string;
//   name: string;
//   url: string;
//   child?: ProductFilterDataChild[];
// }
// const data: ProductFilterData[] = [
//   {
//     id: '123',
//     name: `Men’s shoes`,
//     url: '/',
//     child: [
//       { id: '1', name: `Men’s shoes1`, url: '/' },
//       { id: '12', name: `Men’s shoes1`, url: '/' },
//       { id: '23', name: `Men’s shoes1`, url: '/' },
//       { id: '13', name: `Men’s shoes1`, url: '/' }
//     ]
//   },
//   {
//     id: '1233',
//     name: `Men’s appearance `,
//     url: '/',
//     child: [
//       { id: '1123', name: `Men’s appearance1`, url: '/' },
//       { id: '1223', name: `Men’s appearance1`, url: '/' },
//       { id: '1323', name: `Men’s appearance1`, url: '/' },
//       { id: '1243', name: `Men’s appearance1`, url: '/' }
//     ]
//   },
//   {
//     id: '1231',
//     name: ` Men’s accessories`,
//     url: '/'
//   }
// ];

interface ProductFilterProps {
  handleChange: (data: string) => void;
}
function ProductFilter({ handleChange }: ProductFilterProps) {
  const router = useRouter();
  const { category: categories } = useSelector((state) => state.product);
  const [toggle, setToggle] = useState<boolean>(false);
  const [data, setData] = useState<ICategoryFilter[]>([]);
  const [categorySelection, setCategorySelection] = useState<number>(-1);
  const showChildCategory = useCallback(
    (id: number) => {
      const category = data.find((d) => d.id === id);

      if (!category?.child || category?.child?.length === 0) {
        router.push(category?.url ?? '/');
      } else {
        setCategorySelection(id);
      }
    },
    [data, router]
  );
  const renderCurrentCategory = useMemo(() => {
    const category = data.find((d) => d.id === categorySelection);

    if (category) return category.name_category;
    return '';
  }, [categorySelection, data]);

  const formatData = useCallback(() => {
    const final = categories.results.reduce((total: ICategoryFilter[], value) => {
      if (value.level === 0) total.push({ ...value, url: `/shop/${value.id}`, child: [] });
      if (value.level > 0) {
        total.forEach((d, index) => {
          if (d.id === value.parent) {
            total[index].child.push({ ...value, url: `/shop/${value.id}`, child: [] });
          }
        });
      }
      return total;
    }, []);

    setData(final);
  }, [categories.results]);

  useEffect(() => {
    formatData();
  }, [formatData]);
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
          <FormattedMessage id="product" />
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
            display: categorySelection === -1 ? 'none' : 'flex',
            fontSize: '17px',
            fontWeight: '600',
            color: '#000',
            alignItems: 'center',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
          onClick={() => {
            setCategorySelection(-1);
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
                display: categorySelection !== -1 ? 'none' : 'block'
              }}
              onClick={() => {
                showChildCategory(d.id);
                handleChange(d.name_category);
              }}
            >
              {d.name_category}
            </Typography>

            {(d.child || []).map((ch) => (
              // <Link key={ch.id} href={ch.url}>
              <Typography
                key={ch.id}
                sx={{
                  fontSize: '15px',
                  fontWeight: '400',
                  lineHeight: '14px',
                  color: '#000',
                  marginBottom: '15px',
                  cursor: 'pointer',
                  display: categorySelection !== -1 && d.id === categorySelection ? 'block' : 'none'
                }}
                onClick={() => {
                  handleChange(ch.name_category);
                }}
              >
                {ch.name_category}
              </Typography>
              // </Link>
            ))}
          </div>
        ))}
      </Box>
    </Box>
  );
}

export default ProductFilter;
