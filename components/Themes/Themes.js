import Image from 'next/image';
import BrushIcon from '@mui/icons-material/Brush';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';

import styles from '../Features/Features.module.scss';

const Themes = () => {
  return (
    <div className={styles.grid}>
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
    </div>
  );
};

export { Themes };
