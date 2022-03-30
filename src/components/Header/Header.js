import * as React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useDarkMode } from 'hooks/useDarkMode';
import { useScrollDirection } from 'hooks/useScrollDirection';

import styles from './Header.module.scss';

const Header = () => {
  const { isDarkMode, setTheme } = useDarkMode();
  const scrollDirection = useScrollDirection();

  return (
    <header className={clsx(styles.header, styles[scrollDirection])}>
      <div>
        <h3>React Tables</h3>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.robinwieruch.de/categories/react-table-library/"
        >
          Blog
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://react-table-library.com/"
        >
          Docs
        </a>
      </div>
      <div>
        <IconButton
          size="small"
          onClick={() =>
            window.open(
              'https://github.com/table-library/react-table-library',
              '_newtab'
            )
          }
        >
          <GitHubIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
        >
          {isDarkMode ? (
            <LightModeIcon fontSize="small" />
          ) : (
            <DarkModeIcon fontSize="small" />
          )}
        </IconButton>
      </div>
    </header>
  );
};

export { Header };
