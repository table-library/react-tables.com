import { Section } from 'components/Section';
import { PrimaryButton } from 'components/Button';
import { ClipText } from 'components/ClipText';

const OutlineSection = () => (
  <Section grid>
    <div>
      <h2>
        <ClipText breakline>Presented by</ClipText> React Table
        Library
      </h2>
    </div>
    <div>
      <PrimaryButton
        onClick={() =>
          window
            .open('https://react-table-library.com/', '_blank')
            .focus()
        }
      >
        Learn More
      </PrimaryButton>
    </div>
  </Section>
);

export { OutlineSection };
