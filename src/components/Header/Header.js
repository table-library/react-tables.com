import * as React from 'react';
import clsx from 'clsx';
import { useTheme as useDarkLightTheme } from 'next-themes';

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
  const { theme, setTheme } = useDarkLightTheme();
  const scrollDirection = useScrollDirection();

  return (
    <header className={clsx(styles.header, styles[scrollDirection])}>
      <div>
        <h3>React Tables</h3>
        <div>
          <button
            onClick={() =>
              setTheme(theme === 'dark' ? 'light' : 'dark')
            }
          >
            {theme} Mode
          </button>
        </div>
      </div>
    </header>
  );
};

export { Header };
