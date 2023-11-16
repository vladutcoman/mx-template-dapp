import { useEffect, useRef, useState } from "react";
import { useWebWalletLogin } from "@multiversx/sdk-dapp/hooks/login/useWebWalletLogin";

import { sendTransactions } from "helpers";
import { Transaction } from "@multiversx/sdk-core/out";

const useRNWalletPingTransaction = () => {
  const [token, setToken] = useState<string>('');
  const tokenRef = useRef<string>('');

  useWebWalletLogin({ token });

  useEffect(() => {
    const handleMessage = (message: MessageEvent) => {
      if (tokenRef.current === '') {
        alert('setToken');
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
      // Do Transaction
      alert(`do transaction with siganture: ${signature}`);
    }
  }

  const handleOnClick = () => {
    // @ts-ignore
    if (window.ReactNativeWebView) {
      // @ts-ignore
      window.ReactNativeWebView.postMessage('ping');
    }
  };

  return { handleOnClick };
};

export default useRNWalletPingTransaction;