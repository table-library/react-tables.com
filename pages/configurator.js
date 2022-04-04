import { Header } from 'components/Header';
import { Section } from 'components/Section';

import { Configurator } from 'domain/Configurator';
import { OutlineSection } from 'domain/Sections';
import { ClipText } from 'components/ClipText';

export default function Home() {
  return (
    <div>
      <Header />

      <main>
        <Section grid>
          <h2>
            <ClipText breakline>Table</ClipText> Configurator
          </h2>
        </Section>

        <Section>
          <Configurator />
        </Section>
      </main>

      <footer>
        <OutlineSection />
      </footer>
    </div>
  );
}
