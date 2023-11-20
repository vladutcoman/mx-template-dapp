import { useEffect, useRef, useState } from "react";
import { useWebWalletLogin } from "@multiversx/sdk-dapp/hooks/login/useWebWalletLogin";

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
      // TODO: Sign & Send Transaction
    }
  }

  const handleOnPing = () => {
    // @ts-ignore
    if (window.ReactNativeWebView) {
      // @ts-ignore
      window.ReactNativeWebView.postMessage('ping');
    }
  };

  return { handleOnPing };
};

export default useRNWalletPingTransaction;