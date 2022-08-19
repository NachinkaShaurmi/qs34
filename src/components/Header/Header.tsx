import React from 'react';
import { NavLink } from 'react-router-dom';
import URLS from 'urls';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navigate}>
        <NavLink to={URLS.Base}>Todos List</NavLink>
        <NavLink to={URLS.Todo}>Create todo</NavLink>
      </div>
    </div>
  );
};

export default Header;