import React, { useContext } from 'react';
import { EthersContext } from '~/components/context/EthersContext';
import { SIGNER_MESSAGE } from '~/config/env';
import { useLoginMutation } from '~/schema/generated';

const Login = () => {
  const [login, { loading }] = useLoginMutation();
  const { signer, signerAddr, setLoggedIn } = useContext(EthersContext);

  if (loading) {
    return <div>loading...</div>;
  }

  const handleLogin = async () => {
    if (signer && signerAddr) {
      try {
        const msg = await signer.signMessage(SIGNER_MESSAGE);
        const res = await login({
          variables: {
            wallet: signerAddr,
            msg,
          },
        });
        if (res.data?.login?.authorized) {
          setLoggedIn(true);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;