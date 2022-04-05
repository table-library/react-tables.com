import * as React from 'react';
import clsx from 'clsx';

import { DocCode } from 'components/DocCode';
import { Highlight } from 'components/Highlight';

import styles from './Composition.module.scss';

const composition = `
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
      <DocCode fileName="composition.js">
        <Highlight code={composition} />
      </DocCode>
      <DocCode fileName="configuration.js">
        <Highlight code={configuration} />
      </DocCode>
    </div>
  );
};

export { Composition };
