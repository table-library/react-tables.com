import { Header } from 'components/Header';
import { Section } from 'components/Section';

import * as TABLES from 'domain/Tables';
import { OutlineSection } from 'domain/Sections';

export default function Coinmarketcap() {
  return (
    <div>
      <Header />

      <main>
        <Section>
          <h2 style={{ textAlign: 'center' }}>Coin Market Cap</h2>

          <div
            style={{
              width: '90vw',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TABLES.CoinMarketCap />
          </div>
        </Section>
      </main>

      <footer>
        <OutlineSection />
      </footer>
    </div>
  );
}
