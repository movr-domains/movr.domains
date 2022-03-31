import Toast from './Toast';
import React from 'react';
import Header from './header/index';
import { useRouter } from 'next/router';

interface Props {
  children: React.ReactChild;
}

export default function Layout({ children }: Props) {
  const router = useRouter();
  return (
    <React.Fragment>
      {router.pathname !== '/' && <Header />}
      <div className='wrapper'>
        <div className='col-span-10 col-start-2 px-14'>{children}</div>
      </div>
      <Toast />
    </React.Fragment>
  );
}
