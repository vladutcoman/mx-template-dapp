import { useEffect, useRef, useState } from "react";
import { useWebWalletLogin } from "@multiversx/sdk-dapp/hooks/login/useWebWalletLogin";

const useRNWalletPingTransaction = () => {
  const [token, setToken] = useState<string>('');
  const tokenRef = useRef<string>('');

  useWebWalletLogin({ token });

  useEffect(() => {
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
      // TODO: Send Transaction
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