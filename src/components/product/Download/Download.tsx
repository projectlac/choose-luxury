import DownloadIcon from '@mui/icons-material/Download';
import { Box } from '@mui/material';
function Download() {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <DownloadIcon />
        </Box>
      </Box>
    </>
  );
}

export default Download;
