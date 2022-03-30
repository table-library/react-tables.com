import Image from 'next/image';

import { Grid, GridItem } from 'components/Grid';

const Themes = () => {
  return (
    <Grid width="450px">
      <GridItem>
        <Image
          alt="material"
          src="/themes/material.png"
          height="64"
          width="64"
          style={{ borderRadius: '50%' }}
        />
        <span>Material UI</span>
      </GridItem>
      <GridItem>
        <Image
          alt="chakra"
          src="/themes/chakra.png"
          height="64"
          width="64"
          style={{ borderRadius: '50%' }}
        />
        <span>Chakra UI</span>
      </GridItem>
      <GridItem>
        <Image
          alt="mantine"
          src="/themes/mantine.png"
          height="64"
          width="64"
          style={{ borderRadius: '50%' }}
        />
        <span>Mantine</span>
      </GridItem>
      <GridItem>
        <Image
          alt="ant design"
          src="/themes/antdesign.png"
          height="64"
          width="64"
          style={{ borderRadius: '50%' }}
        />
        <span>Ant Design</span>
      </GridItem>
      <GridItem>
        <Image
          alt="bootstrap"
          src="/themes/bootstrap.png"
          height="64"
          width="64"
          style={{ borderRadius: '50%' }}
        />
        <span>Bootstrap</span>
      </GridItem>
      <GridItem>
        <Image
          alt="semantic"
          src="/themes/semantic.png"
          height="64"
          width="64"
          style={{ borderRadius: '50%' }}
        />
        <span>Semantic UI</span>
      </GridItem>
    </Grid>
  );
};

export { Themes };
