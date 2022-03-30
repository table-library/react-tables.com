import styles from './Grid.module.scss';

const Grid = ({ width, children }) => {
  return (
    <div className={styles.grid} style={{ maxWidth: width }}>
      {children}
    </div>
  );
};

export { Grid };
