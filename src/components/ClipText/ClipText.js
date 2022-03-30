import clsx from 'clsx';

import styles from './ClipText.module.scss';

const ClipText = ({ children, breakline }) => {
  return (
    <span
      className={clsx(styles.clip, { [styles.breakline]: breakline })}
    >
      <div>{children}</div>
      <div>{children}</div>
    </span>
  );
};

export { ClipText };
