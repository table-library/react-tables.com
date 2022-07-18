import { Header } from 'components/Header';
import { Section } from 'components/Section';

import * as TABLES from 'domain/Tables';
import { OutlineSection } from 'domain/Sections';

export default function Gantt() {
  return (
    <div>
      <Header />

      <main>
        <Section>
          <h3 style={{ textAlign: 'center' }}>Gantt</h3>

          <div
            style={{
              width: '90vw',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TABLES.Gantt />
          </div>
        </Section>
      </main>

      <footer>
        <OutlineSection />
      </footer>
    </div>
  );
}
