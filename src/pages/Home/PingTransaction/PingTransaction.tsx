import React, { useEffect, useState } from 'react';
import { useWebWalletLogin } from '@multiversx/sdk-dapp/hooks/login/useWebWalletLogin';
import { useGetLoginInfo } from 'hooks';

/**
 * This is just the skeleton
 * In the final version, all the side-effects will be moved to a custom hook
 */
const PingTransaction = () => {
  const [token, setToken] = useState<string>('');
  const [signature, setSignature] = useState<string>('');

  useEffect(() => {
    useWebWalletLogin({ token });
  }, [token]);

  useEffect(() => {
    if (signature) {
      // Do Transaction
      return;
    } else {
      // Alert user that the transaction was delcined
    }
  }, [signature]);

  const onClick = () => {
    // @ts-ignore
    if (window.ReactNativeWebView) {
      // Initiate transaction and get signature from RN App

      // @ts-ignore
      window.ReactNativeWebView.postMessage('ping');
      console.log('onClick2');
    }
  };

  window.addEventListener('message', (message) => {
    /**
     * First take the authToken
     */

    if (token === '') {
      setToken(message.data);
      return;
    }

    /**
     * Token was populated -> the signature si next.
     * Add it to the transaction
     */
    setSignature(message.data);
    
  });

  return (
    <div className='flex flex-col gap-2 text-sm'>
      <button
        className='self-start inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white mr-0 border-solid border-blue-600 border-[1px]'
        onClick={onClick}
      >
        Ping Transaction
      </button>
    </div>
  );
};

export default PingTransaction;
