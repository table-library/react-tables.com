import clsx from 'clsx';

import styles from './Pane.module.scss';

const Pane = ({ className, children, ...rest }) => {
  return (
    <div className={clsx(styles.pane, className)} {...rest}>
      {children}
    </div>
  );
};

export { Pane };
