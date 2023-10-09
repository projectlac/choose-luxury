// material-ui
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import { DataGrid,  } from '@material-ui/data-grid';
import { useCallback, useEffect, useState } from 'react';
import { IResponseGetProductById } from 'types/services/productApi.types';
import { getProduct } from '../../../api/ProductAPI/productDashboash';
import DataTable from './DataTable';

// ==============================|| TABLE - BASIC DATA GRID ||============================== //

export default function TableDataGrid() {
  const theme = useTheme();
  const [productList, getProductList] = useState<IResponseGetProductById[]>([]);
  const [search, setSearch] = useState<string>('');

  const [page, setPage] = useState<number>(1);

  const [total, setTotal] = useState<number>(0);

  const getListProduct = useCallback(
    async (searchParam: string) => {
      const res = await getProduct({ search: searchParam, page: page });
      getProductList(res.data);
      setTotal(0);
    },
    [page]
  );

  const reloadListProduct = useCallback(() => {
    getListProduct(search);
  }, [getListProduct, search]);

  useEffect(() => {
    reloadListProduct();
  }, [reloadListProduct]);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        '& .MuiDataGrid-root': {
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
          },
          '& .MuiDataGrid-columnsContainer': {
            color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
            borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
          },
          '& .MuiDataGrid-columnSeparator': {
            color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
          }
        }
      }}
    >
      <DataTable cryptoOrders={productList} reSearch={setSearch} reload={reloadListProduct} total={total} setPage={setPage} />
    </Box>
  );
}
