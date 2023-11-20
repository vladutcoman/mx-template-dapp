import React, { useEffect, useState } from 'react';
import { useWebWalletLogin } from '@multiversx/sdk-dapp/hooks/login/useWebWalletLogin';
import { useGetLoginInfo } from 'hooks';
import useRNWalletPingTransaction from 'hooks/transactions/useRNWalletPingTransaction';

const PingTransaction = () => {
  const { handleOnPing } = useRNWalletPingTransaction();

  return (
    <div className='flex flex-col gap-2 text-sm'>
      <button
        className='self-start inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white mr-0 border-solid border-blue-600 border-[1px]'
        onClick={handleOnPing}
      >
        Ping Transaction
      </button>
    </div>
  );
};

export default PingTransaction;
