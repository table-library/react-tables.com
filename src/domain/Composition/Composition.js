import * as React from 'react';
import clsx from 'clsx';

import { Highlight } from 'components/Highlight';

import styles from './Composition.module.scss';

const composition = `
// composition

<Table data={data}>
  {(tableList) => (
    <>
      <Header>
        <HeaderRow>
          <HeaderCell>Task</HeaderCell>
          <HeaderCell>Complete</HeaderCell>
        </HeaderRow>
      </Header>

      <Body>
        {tableList.map((item) => (
          <Row key={item.id} item={item}>
            <Cell>{item.name}</Cell>
            <Cell>{item.isComplete.toString()}</Cell>
          </Row>
        ))}
      </Body>
    </>
  )}
</Table>
`;

const configuration = `
// configuration

<CompactTable
  data={data}
  columns={[
    {
      label: 'Task',
      renderCell: (item) => item.name
    },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
    },
  ]}
/>;
`;

const Composition = () => {
  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.pane)}>
        <Highlight code={composition} />
      </div>
      <div className={clsx(styles.pane)}>
        <Highlight code={configuration} />
      </div>
    </div>
  );
};

export { Composition };
