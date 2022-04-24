import { Box, Stack } from '@chakra-ui/react';
import { Link } from '~/components/shared/Link';
import React from 'react';
import { Image } from '~/components/shared/Image';
import BacktalkLogo from 'src/assets/images/backtalk/backtalk-icon.svg';

export const Navbar = () => {
  return (
    <Box backgroundColor='white' boxShadow='xs' p={1} pt={2}>
      <Stack justify='space-between' maxW='4xl' mx='auto'>
        <Box textAlign={{ base: 'center', lg: 'left' }}>
          <Link href='/backtalk'>
            <Image
              src={BacktalkLogo}
              alt='BacktalkLogo'
              height={38}
              width={52}
            />
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};
