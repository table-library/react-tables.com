import { Header } from 'components/Header';
import { Section } from 'components/Section';

import * as TABLES from 'domain/Tables';
import { OutlineSection } from 'domain/Sections';

export default function Asana() {
  return (
    <div>
      <Header />

      <main>
        <Section noPaddingOnMobile>
          <h3 style={{ textAlign: 'center' }}>Asana</h3>

          <div
            style={{
              width: '90vw',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TABLES.Asana />
          </div>
        </Section>
      </main>

      <footer>
        <OutlineSection />
      </footer>
    </div>
  );
}
