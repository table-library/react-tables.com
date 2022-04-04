import * as React from 'react';
import clsx from 'clsx';

import { Highlight } from 'components/Highlight';

import styles from '../Composition/Composition.module.scss';

const declarative = `
// declarative

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
// imperative

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
      <div className={clsx(styles.pane)}>
        <Highlight code={declarative} />
      </div>
      <div className={clsx(styles.pane)}>
        <Highlight code={imperative} />
      </div>
    </div>
  );
};

export { Programming };
