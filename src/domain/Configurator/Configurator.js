import * as React from 'react';
import Button from '@mui/material/Button';
import copy from 'copy-to-clipboard';
import prettier from 'prettier/standalone';
import babelParser from 'prettier/parser-babel';
import SplitPane from 'react-split-pane';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from 'react-live';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import {
  useSort,
  HeaderCellSort,
} from '@table-library/react-table-library/sort';
import {
  useRowSelect,
  HeaderCellSelect,
  CellSelect,
} from '@table-library/react-table-library/select';
import {
  useTree,
  CellTree,
} from '@table-library/react-table-library/tree';

import { useDarkMode } from 'hooks/useDarkMode';

import { nodes } from '../data';
import { THEME } from '../theme';

const getComponentCode = ({ resize, sort, select, tree }) => {
  // headerCellComponentTag

  let headerCellComponentTag = `HeaderCell`;

  if (sort) {
    headerCellComponentTag = `HeaderCellSort`;
  }

  // headerCellComponentProps

  let headerCellComponentProps = ``;

  if (resize) {
    headerCellComponentProps = `
      ${headerCellComponentProps}
      resize
    `;
  }

  // hooks

  let hooks = '';

  if (sort) {
    hooks = `
      ${hooks}
      const sort = useSort(
        data,
        null,
        {
          sortFns: {
            TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
            DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
            TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
            COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
            TASKS: (array) => array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
          },
        },
      );
    `;
  }

  if (select) {
    hooks = `
      ${hooks}
      const select = useRowSelect(data);
    `;
  }

  if (tree) {
    let treeHook = `
      const tree = useTree(data);
    `;

    if (select) {
      treeHook = `
        const tree = useTree(data, null, {
          treeYLevel: 1,
        });
      `;
    }

    hooks = `
      ${hooks}
      ${treeHook}
    `;
  }

  // tableComponentOpen

  let tableComponentOpen = `
    <Table
      data={data}
      theme={theme}
  `;

  if (sort) {
    tableComponentOpen = `
      ${tableComponentOpen}
      sort={sort}
    `;
  }

  if (select) {
    tableComponentOpen = `
      ${tableComponentOpen}
      select={select}
  `;
  }

  if (tree) {
    tableComponentOpen = `
      ${tableComponentOpen}
      tree={tree}
    `;
  }

  tableComponentOpen = `
    ${tableComponentOpen}
    >
  `;

  // firstCellComponent

  let firstCellComponent = `<Cell>{item.name}</Cell>`;

  if (tree) {
    firstCellComponent = `<CellTree item={item}>{item.name}</CellTree>`;
  }

  return `
    () => {
      const data = { nodes };

      const theme = useTheme(THEME);

      ${hooks}

      return (
        ${tableComponentOpen}
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  ${select ? '<HeaderCellSelect />' : ''}
                  <${headerCellComponentTag} ${headerCellComponentProps} ${
    sort ? 'sortKey="Task"' : ''
  }>Task</${headerCellComponentTag}>
                  <${headerCellComponentTag} ${headerCellComponentProps} ${
    sort ? 'sortKey="Deadline"' : ''
  }>Deadline</${headerCellComponentTag}>
                  <${headerCellComponentTag} ${headerCellComponentProps} ${
    sort ? 'sortKey="Type"' : ''
  }>Type</${headerCellComponentTag}>
                  <${headerCellComponentTag} ${headerCellComponentProps} ${
    sort ? 'sortKey="Complete"' : ''
  }>Complete</${headerCellComponentTag}>
                  <${headerCellComponentTag} ${headerCellComponentProps} ${
    sort ? 'sortKey="Tasks"' : ''
  }>Tasks</${headerCellComponentTag}>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    ${select ? '<CellSelect item={item} />' : ''}
                    ${firstCellComponent}
                    <Cell>
                      {item.deadline.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </Cell>
                    <Cell>{item.type}</Cell>
                    <Cell>{item.isComplete.toString()}</Cell>
                    <Cell>{item.nodes ? item.nodes.length : ''}</Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      );
    };
  `;
};

const getImportsCode = ({ resize, sort, select, tree }) => {
  let imports = `
    import {
      Table,
      Header,
      HeaderRow,
      Body,
      Row,
      HeaderCell,
      Cell,
    } from '@table-library/react-table-library/table';

    import { useTheme } from '@table-library/react-table-library/theme';
  `;

  if (resize) {
  }

  if (sort) {
    imports = `
      ${imports}
      import {
        useSort,
        HeaderCellSort,
      } from '@table-library/react-table-library/sort';
    `;
  }

  if (select) {
    imports = `
      ${imports}
      import {
        useRowSelect,
        HeaderCellSelect,
        CellSelect,
      } from '@table-library/react-table-library/select';
    `;
  }

  if (tree) {
    imports = `
      ${imports}
      import {
        useTree,
        CellTree,
      } from '@table-library/react-table-library/tree';
    `;
  }

  return imports;
};

const getDataCode = () => {
  return `
    const nodes = ${JSON.stringify(nodes)};
  `;
};

const getThemeCode = () => {
  return `
    const THEME = {
      Table: \`${THEME.Table ? THEME.Table : ''}\`,
      Header: \`${THEME.Header ? THEME.Header : ''}\`,
      Body: \`${THEME.Body ? THEME.Body : ''}\`,
      BaseRow: \`${THEME.BaseRow ? THEME.BaseRow : ''}\`,
      HeaderRow: \`${THEME.HeaderRow ? THEME.HeaderRow : ''}\`,
      Row: \`${THEME.Row ? THEME.Row : ''}\`,
      BaseCell: \`${THEME.BaseCell ? THEME.BaseCell : ''}\`,
      HeaderCell: \`${THEME.HeaderCell ? THEME.HeaderCell : ''}\`,
      Cell: \`${THEME.Cell ? THEME.Cell : ''}\`,
    };
  `;
};

const getCode = (liveEditorView, features) => {
  let code = '';

  if (liveEditorView === 'Component') {
    code = getComponentCode(features);
  }
  if (liveEditorView === 'Imports') {
    code = getImportsCode(features);
  }
  if (liveEditorView === 'Data') {
    code = getDataCode();
  }
  if (liveEditorView === 'Theme') {
    code = getThemeCode();
  }

  return prettier.format(code, {
    parser: 'babel',
    plugins: [babelParser],
  });
};

const LIVE_EDTIOR_VIEWS = ['Component', 'Imports', 'Data', 'Theme'];

const Configurator = () => {
  const [liveEditorView, setLiveEditorView] = React.useState(
    LIVE_EDTIOR_VIEWS[0]
  );

  const [resize, setResize] = React.useState(false);
  const [sort, setSort] = React.useState(false);
  const [select, setSelect] = React.useState(false);
  const [tree, setTree] = React.useState(false);

  const code = getCode(liveEditorView, {
    resize,
    sort,
    select,
    tree,
  });

  const handleCopyToClipboard = () => copy(code);

  const { isDarkMode } = useDarkMode();

  return (
    <div className="react-live" style={{ display: 'contents' }}>
      <LiveProvider
        theme={isDarkMode ? nightOwl : nightOwlLight}
        code={code}
        scope={{
          nodes,
          THEME,
          useTheme,

          Table,
          Header,
          HeaderRow,
          Body,
          Row,
          HeaderCell,
          Cell,

          useSort,
          HeaderCellSort,

          useRowSelect,
          HeaderCellSelect,
          CellSelect,

          useTree,
          CellTree,
        }}
      >
        <SplitPane
          split="horizontal"
          defaultSize="50%"
          paneStyle={{ overflow: 'auto' }}
        >
          <SplitPane
            split="vertical"
            defaultSize="50%"
            paneStyle={{ overflow: 'auto' }}
          >
            <div
              style={{
                minHeight: '100%',
                borderRight:
                  '1px solid var(--theme-ui-colors-border)',
              }}
            >
              <Button
                style={{ borderRadius: 0 }}
                onClick={() => setResize(!resize)}
              >
                {resize ? 'Disable' : 'Enable'} Resize
              </Button>
              <Button
                style={{ borderRadius: 0 }}
                onClick={() => setSort(!sort)}
              >
                {sort ? 'Disable' : 'Enable'} Sort
              </Button>
              <Button
                style={{ borderRadius: 0 }}
                onClick={() => setSelect(!select)}
              >
                {select ? 'Disable' : 'Enable'} Select
              </Button>
              <Button
                style={{ borderRadius: 0 }}
                onClick={() => setTree(!tree)}
              >
                {tree ? 'Disable' : 'Enable'} Tree
              </Button>
            </div>
            <div style={{ minHeight: '100%' }}>
              <div
                style={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom:
                    '1px solid var(--theme-ui-colors-border)',
                  backgroundColor:
                    'var(--theme-ui-colors-background)',
                }}
              >
                <div>
                  {LIVE_EDTIOR_VIEWS.map((view) => (
                    <Button
                      key={view}
                      variant={
                        view === liveEditorView
                          ? 'outlined'
                          : 'filled'
                      }
                      style={{ borderRadius: 0 }}
                      onClick={() => setLiveEditorView(view)}
                    >
                      {view}
                    </Button>
                  ))}
                </div>
                <div>
                  <Button
                    style={{ borderRadius: 0 }}
                    onClick={handleCopyToClipboard}
                  >
                    Copy
                  </Button>
                </div>
              </div>
              <LiveEditor
                style={{
                  overflowX: 'auto',
                  fontSize: 'small',
                  minHeight: '100%',
                  background: 'var(--theme-ui-colors-background)',
                }}
              />
            </div>
          </SplitPane>
          <LivePreview
            style={{
              height: '100%',
              borderTop: '1px solid var(--theme-ui-colors-border)',
            }}
          />
        </SplitPane>
      </LiveProvider>
    </div>
  );
};

export { Configurator };
