import * as React from 'react';
import clsx from 'clsx';

import styles from './DocCode.module.scss';

const DocCode = ({ fileName, children }) => {
  return (
    <div className={clsx(styles.docCode)}>
      <div className={clsx(styles.docCodeHeader)}>
        <div>{fileName}</div>
      </div>
      <div className={clsx(styles.docCodeContent)}>{children}</div>
    </div>
  );
};

export { DocCode };
