import React, { useState } from 'react';

const PingTransaction = () => {
  const [text, setText] = useState('Click me to change text');

  const onClick = () => {
    console.log('onClick');

    // @ts-ignore
    window.ReactNativeWebView.postMessage('aaaa');
    console.log('onClick2');
  };

  window.addEventListener('message', (message) => {
    console.log(message.data); // Wayne is coming!!!
    setText(message.data);
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
