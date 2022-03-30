import clsx from 'clsx';

import styles from './Section.module.scss';

const Section = ({
  grid = false,
  planets = [],
  alignment = 'center',
  children,
}) => {
  return (
    <section className={clsx(styles.section)}>
      <div className={clsx(styles.content, styles[alignment])}>
        {children}
      </div>
      <div className={clsx({ [styles.grid]: grid })} />
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
