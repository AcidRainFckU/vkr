import React, { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import Header from '../Header';

type Props = {};

const PageLayout: FC<PropsWithChildren<Props>> = ({ children }) => {
  const user = useAppSelector((store) => store.user);
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="page min-h-screen">
      <header className="header">
        <Header />
      </header>
      <div className="container h-full mx-auto">{children}</div>
    </div>
  );
};

export default PageLayout;
