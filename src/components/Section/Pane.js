import clsx from 'clsx';

import styles from './Pane.module.scss';

const Pane = ({ children, ...rest }) => {
  return (
    <div className={clsx(styles.pane)} {...rest}>
      {children}
    </div>
  );
};

export { Pane };
