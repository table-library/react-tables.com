import Head from 'next/head';

import { Header } from 'components/Header';
import { Section } from 'components/Section';
import { planetOne, planetTwo } from 'components/Planets';

import * as TABLES from 'domain/Tables';
import { Features } from 'domain/Features';
import { Themes } from 'domain/Themes';
import { LandingSection, OutlineSection } from 'domain/Sections';

export default function Home() {
  return (
    <div>
      <Head>
        <title>React Tables</title>
        <meta
          name="description"
          content="Awesome React Tables by React Table Library"
        />
      </Head>

      <Header />

      <main>
        <LandingSection />

        <Section>
          <h2>CoinMarketCap</h2>

          <div
            style={{
              width: '90vw',
              display: 'flex',
              flexDirection: 'column',
              margin: '20px',
            }}
          >
            <TABLES.CoinMarketCap />
          </div>
        </Section>

        <Section
          grid
          planets={[
            {
              height: 800,
              width: 800,
              left: '30%',
              bottom: '10%',
              opacity: '45%',
              background: planetOne,
            },
            {
              height: 300,
              width: 300,
              left: '15%',
              top: '15%',
              opacity: '30%',
              background: planetTwo,
            },
          ]}
        >
          <h2>Features</h2>
          <Features />
        </Section>

        <Section>
          <h2>Asana</h2>

          <div
            style={{
              width: '90vw',
              display: 'flex',
              flexDirection: 'column',
              margin: '20px',
            }}
          >
            <TABLES.Asana />
          </div>
        </Section>

        <Section
          grid
          planets={[
            {
              height: 1400,
              width: 1400,
              left: '70%',
              bottom: '20%',
              opacity: '45%',
              background: planetTwo,
            },
            {
              height: 1400,
              width: 1400,
              left: '-50%',
              bottom: '-50%',
              opacity: '45%',
              background: planetTwo,
            },
          ]}
        >
          <h2>Built-In Themes</h2>
          <Themes />
        </Section>

        <OutlineSection />
      </main>

      <footer></footer>
    </div>
  );
}
