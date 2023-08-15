import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Typography } from '@mui/material';

interface IPropsHiddenFilter {
  hiddenFilter: boolean;
  setHiddenFilter: React.Dispatch<React.SetStateAction<boolean>>;
}
function Filter({ hiddenFilter, setHiddenFilter }: IPropsHiddenFilter) {
  return (
    <Box>
      <Box display={'flex'} alignItems={'center'} sx={{ marginBottom: '50px' }}>
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: '600',
            lineHeight: '18px',
            color: '#000',
            marginRight: '32px',
            fontFamily: 'Quicksand'
          }}
        >
          Filter
        </Typography>
        <ArrowForwardIosIcon
          sx={{ color: '#000', transition: 'all 0.2s', transform: `${hiddenFilter ? 'rotate(0deg)' : 'rotate(90deg)'}` }}
          onClick={() => {
            setHiddenFilter(!hiddenFilter);
          }}
        />
      </Box>
    </Box>
  );
}

export default Filter;
