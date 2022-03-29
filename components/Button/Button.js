import styles from './Button.module.scss';

const Button = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      <div className={styles.content}>{children}</div>
      <div className={styles.background} />
    </button>
  );
};

export { Button };
