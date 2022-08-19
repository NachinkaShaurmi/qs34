import Header from 'components/Header/Header';
import React, { PropsWithChildren } from 'react';
import styles from './DefaultLayout.module.scss';

const DefaultLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.root}>
     <Header />
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default DefaultLayout;