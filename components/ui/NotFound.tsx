'use client';
import { Box, Typography } from '@mui/material';

export const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
      sx={{
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        fontSize={80}
        fontWeight={200}
        display="flex"
      >
        404&nbsp;
        <Box
          component="span"
          sx={{
            display: {
              xs: 'none',
              sm: 'flex',
            },
          }}
        >
          |
        </Box>
      </Typography>
      <Typography
        fontSize={20}
        marginLeft={{
          xs: 0,
          sm: 2,
        }}
      >
        Page not found
      </Typography>
    </Box>
  );
};
