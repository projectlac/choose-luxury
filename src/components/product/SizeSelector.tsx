import * as React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { SizeData } from 'types/shop/shopItem';

interface ISizeSeletorProps {
  size: SizeData[];
}
function SizeSelector({ size }: ISizeSeletorProps) {
  const [alignment, setAlignment] = React.useState<string | null>('');

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);
  };
  return (
    <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
      {size.map((d) => (
        <ToggleButton
          value={d.size}
          aria-label={d.size}
          key={d.id}
          sx={{
            borderRadius: '0',
            border: '1px solid black !important',
            width: '33px',
            height: '33px',
            marginRight: '7px',
            fontSize: '16px',
            color: '#000',
            padding: '0',
            '&:hover': {
              backgroundColor: '#eee',
              color: '#000'
            },
            '&.Mui-selected': {
              backgroundColor: '#ddd',
              color: '#000'
            }
          }}
        >
          {d.size}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default SizeSelector;
