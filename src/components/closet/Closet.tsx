import React, { useContext } from 'react';
import { EthersContext } from '~/components/context/EthersContext';
import { Connect } from '~/components/shared/Connect';
import { Link } from '~/components/shared/Link';
import { CheeseLoader } from '~/components/shared/CheeseLoader';
import { useRouter } from 'next/router';
import { ClosetContext } from '~/components/context/ClosetContext';
import { ClosetItemList } from '~/components/closet/ClosetItemList';
import { ClosetMirror } from '~/components/closet/ClosetMirror';

const Closet = () => {
  const router = useRouter();
  const { connected } = useContext(EthersContext);
  const { currentRat, loading, canvas, tryOnClothes, tokenProgress } =
    useContext(ClosetContext);
  return (
    <div className='max-w-7xl mx-auto pt-20 pb-4'>
      <div className='text-white text-center mb-4'>
        <p>
          Welcome to the Aww, Rats closet. We&apos;re constantly adding new
          things to make your little critter look extra attRATctive.
        </p>
        <p>
          Don&apos;t have a rat?{' '}
          <Link href='/' className='underline'>
            mint one now
          </Link>
        </p>
      </div>
      <div className='flex flex-col md:flex-row md:h-screen'>
        <div className='container max-w-sm mx-auto my-2 p-4'>
          {router.route !== '/' && !connected && (
            <div className='bg-light p-4 rounded-md text-black w-fit mx-auto'>
              <Connect />
            </div>
          )}
          <ClosetMirror />
          {currentRat && canvas && (
            <button
              className='download py-2 px-3 w-80 block mt-4 mx-auto text-white rounded-md duration-300 bg-purple-700 hover:bg-purple-800'
              onClick={(e) => {
                const link = document.createElement('a');
                link.download = `${currentRat.label}.png`;
                link.href = canvas.toDataURL();
                link.click();
              }}>
              Download it!
            </button>
          )}
        </div>

        <div className='container mx-auto flex justify-center p-4 md:max-h-2/3 md:overflow-y-auto'>
          {currentRat && loading.pieces && (
            <div className='w-full mx-auto mt-40 h-3/4 items-center text-center'>
              <CheeseLoader className='w-20 h-20' />

              <div className='mx-auto h-3 relative rounded-full overflow-hidden w-80'>
                <div className='w-full h-full bg-gray-200 absolute'></div>
                <div
                  className='h-full bg-purple-700 absolute transition-width duration-300'
                  style={{ width: `${tokenProgress}%` }}></div>
              </div>
            </div>
          )}
          {currentRat ? (
            <ClosetItemList />
          ) : (
            <div className='text-white'>Please select a rat</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Closet;
