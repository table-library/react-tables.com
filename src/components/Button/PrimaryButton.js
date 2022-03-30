import styles from './PrimaryButton.module.scss';

const PrimaryButton = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      <div className={styles.content}>{children}</div>
      <div className={styles.background} />
    </button>
  );
};

export { PrimaryButton };
