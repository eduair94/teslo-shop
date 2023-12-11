import { ISize } from '@/interfaces';
import { Box, Button } from '@mui/material';
import { FC } from 'react';

interface Props {
  selectedSize?: string;
  sizes: ISize[];
}

export const SizeSelector: FC<Props> = ({ sizes, selectedSize }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? 'primary' : 'info'}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
