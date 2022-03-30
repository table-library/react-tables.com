import * as React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useDarkMode } from 'hooks/useDarkMode';

import styles from './Header.module.scss';

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = React.useState('up');

  React.useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDirection]);

  return scrollDirection;
};

const Header = () => {
  const { isDarkMode, setTheme } = useDarkMode();
  const scrollDirection = useScrollDirection();

  return (
    <header className={clsx(styles.header, styles[scrollDirection])}>
      <div>
        <h3>React Tables</h3>
        <div>
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
      </div>
    </header>
  );
};

export { Header };
