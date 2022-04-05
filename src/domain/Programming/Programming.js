import * as React from 'react';
import clsx from 'clsx';

import { DocCode } from 'components/DocCode';
import { Highlight } from 'components/Highlight';

import styles from '../Composition/Composition.module.scss';

const declarative = `
// built-in declarative components

<Header>
  <HeaderRow>
    <HeaderCellSelect />
    <HeaderCell>Task</HeaderCell>
    <HeaderCell>Deadline</HeaderCell>
    <HeaderCell>Type</HeaderCell>
    <HeaderCell>Complete</HeaderCell>
    <HeaderCell>Tasks</HeaderCell>
  </HeaderRow>
</Header>
`;

const imperative = `
// exposed imperative methods

<Header>
  <HeaderRow>
    <HeaderCell stiff>
      <MaterialCheckbox
        size="small"
        checked={select.state.all}
        indeterminate={!select.state.all && !select.state.none}
        onChange={select.fns.onToggleAll}
      />
    </HeaderCell>
    <HeaderCell>Task</HeaderCell>
    <HeaderCell>Deadline</HeaderCell>
    <HeaderCell>Type</HeaderCell>
    <HeaderCell>Complete</HeaderCell>
    <HeaderCell>Tasks</HeaderCell>
  </HeaderRow>
</Header>
`;

const Programming = () => {
  return (
    <div className={clsx(styles.container)}>
      <DocCode fileName="declarative.js">
        <Highlight code={declarative} />
      </DocCode>
      <DocCode fileName="imperative.js">
        <Highlight code={imperative} />
      </DocCode>
    </div>
  );
};

export { Programming };
