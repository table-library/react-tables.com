import clsx from 'clsx';

import styles from './GridItem.module.scss';

const GridItem = ({ rotate, children }) => {
  return (
    <div
      className={clsx(styles.gridItem, { [styles.rotate]: rotate })}
    >
      <div className={clsx(styles.content)}>{children}</div>
      <div className={clsx(styles.stencil)} />
    </div>
  );
};

export { GridItem };
