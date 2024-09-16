import { useEffect, useRef, useState } from 'react';
import { useWebWalletLogin } from '@multiversx/sdk-dapp/hooks/login/useWebWalletLogin';

const useRNWalletPingTransaction = () => {
  const [token, setToken] = useState<string>('');
  const tokenRef = useRef<string>('');

  const [initiateLogin, _] = useWebWalletLogin({ token });

  useEffect(() => {
    if (token) {
      initiateLogin();
    }
  }, [token]);

  useEffect(() => {
    /**
     * TODO: Test this logic when the flow is complete and see if it can be improved
     */
    const handleMessage = (message: MessageEvent) => {
      if (tokenRef.current === '') {
        tokenRef.current = message.data;
        setToken(message.data);
        return;
      }
      handleTransaction(message.data);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleTransaction = async (signature: string) => {
    if (signature) {
      /**
       * TODO: Sign & Send Transaction
       * At the moment, I am thinking of signing the transaction directly (not using any service & from these dapp)
       * Very similar with what I did in the Wallet App
       * transaction.applySignature(Buffer.from(signature, 'hex'));
       */
    }
  };

  const handleOnPing = () => {
    // @ts-ignore
    if (window.ReactNativeWebView) {
      /**
       * TODO: Init transaction
       */
      // @ts-ignore
      window.ReactNativeWebView.postMessage('ping');
    }
  };

  return { handleOnPing };
};

export default useRNWalletPingTransaction;
