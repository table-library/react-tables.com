import clsx from 'clsx';

import { useDarkMode } from 'hooks/useDarkMode';

import styles from './Section.module.scss';

const Section = ({
  split = false,
  grid = false,
  planets = [],
  alignment = 'center',
  children,
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <section className={clsx(styles.section)}>
      <div
        className={clsx(styles.content, styles[alignment], {
          [styles.split]: split,
        })}
      >
        {children}
      </div>

      {isDarkMode && (
        <div className={clsx({ [styles.grid]: grid })} />
      )}
      {planets.map((planet, index) => (
        <div
          key={index}
          className={clsx(styles.planet)}
          style={planet}
        />
      ))}
    </section>
  );
};

export { Section };
