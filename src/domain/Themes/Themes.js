import Image from 'next/image';

import styles from '../Features/Features.module.scss';

const Themes = () => {
  return (
    <div className={styles.grid} style={{ maxWidth: '450px' }}>
      <div className={styles.gridItem}>
        <Image
          alt="material"
          src="/themes/material.png"
          height="64"
          width="64"
          style={{ borderRadius: '50%' }}
        />
        <span>Material UI</span>
      </div>
      <div className={styles.gridItem}>
        <Image
          alt="chakra"
          src="/themes/chakra.png"
          height="64"
          width="64"
          style={{ borderRadius: '50%' }}
        />
        <span>Chakra UI</span>
      </div>
      <div className={styles.gridItem}>
        <Image
          alt="mantine"
          src="/themes/mantine.png"
          height="64"
          width="64"
          style={{ borderRadius: '50%' }}
        />
        <span>Mantine</span>
      </div>
      <div className={styles.gridItem}>
        <Image
          alt="ant design"
          src="/themes/antdesign.png"
          height="64"
          width="64"
          style={{ borderRadius: '50%' }}
        />
        <span>Ant Design</span>
      </div>
      <div className={styles.gridItem}>
        <Image
          alt="bootstrap"
          src="/themes/bootstrap.png"
          height="64"
          width="64"
          style={{ borderRadius: '50%' }}
        />
        <span>Bootstrap</span>
      </div>
      <div className={styles.gridItem}>
        <Image
          alt="semantic"
          src="/themes/semantic.png"
          height="64"
          width="64"
          style={{ borderRadius: '50%' }}
        />
        <span>Semantic UI</span>
      </div>
    </div>
  );
};

export { Themes };
