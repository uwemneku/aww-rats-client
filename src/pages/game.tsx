import type { NextPage } from 'next';
import { RatRaceLayout } from '~/components/layout/RatRaceLayout';
import { Box } from '@chakra-ui/react';
import { SoloEncounterList } from '~/components/game/solo-encounters/SoloEncounterList';
import { TutorialVideo } from '~/components/game/shared/TutorialVideo';
import { GameContextProvider } from '~/components/context/GameContext';
import { SelectedEncounter } from '~/components/game/SelectedEncounter';
import AuthCookieRequired from '~/components/access/AuthCookieRequired';
import { PlayerStats } from '~/components/game/player/PlayerStats';
import { AttemptEncounterButton } from '~/components/game/shared/AttemptEncounterButton';

const GamePage: NextPage = () => {
  return (
    <RatRaceLayout className='min-h-screen rrPage--sewer-blueGray'>
      <Box pb={12}>
        <AuthCookieRequired>
          <TutorialVideo />
          <GameContextProvider>
            <PlayerStats />
            <SoloEncounterList />
            <Box
              bg='blueGray.500'
              boxShadow='lg'
              display='flex'
              flexDirection='column'
              mt={2}
              mx='auto'
              w='725px'
              rounded='xl'>
              <SelectedEncounter />
            </Box>
            <Box position='fixed' bottom='0' w='100%'>
              <AttemptEncounterButton />
            </Box>
          </GameContextProvider>
        </AuthCookieRequired>
      </Box>
    </RatRaceLayout>
  );
};

export default GamePage;
