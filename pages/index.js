import Head from 'next/head';
import Image from 'next/image';

import { Button } from '../components/Button';
import { Section } from '../components/Section';

import * as TABLES from '../components/Tables';
import { Features } from '../components/Features';
import { Themes } from '../components/Themes';

const planetOne =
  'linear-gradient(to bottom, rgba(27,41,72,1) 0%,rgba(31,49,79,1) 0%,rgba(20,25,52,1) 10%,rgba(15,14,39,1) 21%,rgba(11,9,29,1) 52%,rgba(13,12,32,1) 100%)';
const planetTwo =
  'linear-gradient(to bottom, rgba(48,34,111,1) 0%,rgba(35,25,80,1) 5%,rgba(27,19,62,1) 8%,rgba(20,16,48,1) 13%,rgba(17,13,40,1) 17%,rgba(12,9,29,1) 51%,rgba(12,10,30,1) 78%,rgba(16,12,36,1) 100%)';

const LandingSection = ({ children }) => (
  <Section
    grid
    planets={[
      {
        height: 1200,
        width: 1200,
        left: '55%',
        bottom: '5%',
        opacity: '30%',
        background: planetOne,
      },
      {
        height: 600,
        width: 600,
        left: '5%',
        top: '5%',
        opacity: '50%',
        background: planetTwo,
      },
    ]}
  >
    {children}

    <Button
      onClick={() =>
        window
          .open('https://react-table-library.com/', '_blank')
          .focus()
      }
    >
      Learn More
    </Button>
  </Section>
);

export default function Home() {
  return (
    <div>
      <Head>
        <title>React Table Library</title>
        <meta
          name="description"
          content="Awesome React Tables by React Table Library"
        />
      </Head>

      <main>
        <LandingSection>
          <h1>Awesome React Tables</h1>
        </LandingSection>

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
        // grid
        // planets={[
        //   {
        //     height: 800,
        //     width: 800,
        //     left: '30%',
        //     bottom: '10%',
        //     opacity: '45%',
        //     background: planetOne,
        //   },
        //   {
        //     height: 300,
        //     width: 300,
        //     left: '15%',
        //     top: '15%',
        //     opacity: '30%',
        //     background: planetTwo,
        //   },
        // ]}
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

        <LandingSection>
          <h2>Presented by React Table Library</h2>
        </LandingSection>
      </main>

      <footer></footer>
    </div>
  );
}
