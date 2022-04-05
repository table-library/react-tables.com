import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Section, Pane } from 'components/Section';
import { PrimaryButton } from 'components/Button';
import { ClipText } from 'components/ClipText';

import { planetOne, planetTwo } from 'components/Planets';

const LandingSection = () => (
  <Section
    columnOnMobile
    split
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
    <Pane
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>
        <ClipText breakline>Awesome</ClipText>
        React Tables
      </h1>

      <PrimaryButton
        onClick={() =>
          window
            .open('https://react-table-library.com/', '_blank')
            .focus()
        }
      >
        Learn More
      </PrimaryButton>
    </Pane>
    <Pane>
      <p>
        Presented by <strong>react-table-library</strong> with ...
      </p>
      <ul>
        <li>
          <p>
            <ArrowForwardIcon fontSize="small" /> opt-in feature
            richness
          </p>
        </li>
        <li>
          <p>
            <ArrowForwardIcon fontSize="small" /> built-in themes
          </p>
        </li>
        <li>
          <p>
            <ArrowForwardIcon fontSize="small" /> simple custom
            theming
          </p>
        </li>
        <li>
          <p>
            <ArrowForwardIcon fontSize="small" /> server-side
            operations
          </p>
        </li>
        <li>
          <p>
            <ArrowForwardIcon fontSize="small" /> small library size
          </p>
        </li>
        <li>
          <p>
            <ArrowForwardIcon fontSize="small" /> developer experience
          </p>
        </li>
        <li>
          <p>
            <ArrowForwardIcon fontSize="small" /> TypeScript support
          </p>
        </li>
        <li>
          <p>
            <ArrowForwardIcon fontSize="small" /> SSR support
          </p>
        </li>
      </ul>
      <p>... in mind.</p>
    </Pane>
  </Section>
);

export { LandingSection };
