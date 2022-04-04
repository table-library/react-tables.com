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
  SelectClickTypes,
  SelectTypes,
} from '@table-library/react-table-library/select';
import {
  useTree,
  CellTree,
} from '@table-library/react-table-library/tree';

import MaterialCheckbox from '@mui/material/Checkbox';

import { useDarkMode } from 'hooks/useDarkMode';

import { nodes } from '../data';
import { THEME } from '../theme';

import { Wizard } from './Wizard';

const getComponentCode = ({ resize, sort, select, tree }) => {
  // headerCellComponentTag

  let headerCellComponentTag = `HeaderCell`;

  if (sort.enabled) {
    headerCellComponentTag = `HeaderCellSort`;
  }

  // headerCellComponentProps

  let headerCellComponentProps = ``;

  if (resize.enabled) {
    headerCellComponentProps = `
      ${headerCellComponentProps}
      resize
    `;
  }

  // hooks

  let hooks = '';

  if (sort.enabled) {
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

  if (select.enabled) {
    let selectHook = `
      ${hooks}
      const select = useRowSelect(
        data,
        {
          ${
            select.hasInitialStateSingleSelect
              ? 'state: { id: "2" },'
              : ''
          }
          ${
            select.hasInitialStateMultiSelect
              ? 'state: { ids: ["2", "4"] },'
              : ''
          }
          ${
            select.hasCallbackHandler
              ? 'onChange: onSelectChange,'
              : ''
          }
        },
        {
          ${
            select.selectOnlyCheckbox
              ? `
                clickType: SelectClickTypes.ButtonClick,
              `
              : ''
          }
          ${
            select.allSingleSelect
              ? `
                rowSelect: SelectTypes.SingleSelect,
                buttonSelect: SelectTypes.SingleSelect,
              `
              : ''
          }
          ${
            select.allMultiSelect
              ? `
                rowSelect: SelectTypes.MultiSelect,
                buttonSelect: SelectTypes.MultiSelect,
              `
              : ''
          }
        }
      );
    `;

    hooks = `
      ${hooks}
      ${selectHook}
    `;
  }

  if (tree.enabled) {
    let treeHook = `
      const tree = useTree(data);
    `;

    if (select.enabled) {
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

  // hasCallbackHandler

  let callbackHandlers = '';

  if (resize.enabled && resize.hasCallbackHandler) {
  }

  if (sort.enabled && sort.hasCallbackHandler) {
  }

  if (select.enabled && select.hasCallbackHandler) {
    callbackHandlers = `
      ${callbackHandlers}
      function onSelectChange(action, state) {
        console.log(action, state);
      }
    `;
  }

  if (tree.enabled && tree.hasCallbackHandler) {
  }

  // header cell select

  let headerCellSelect = '';

  if (select.enabled && select.checkbox) {
    headerCellSelect = '<HeaderCellSelect />';

    if (select.thirdParty) {
      headerCellSelect = `
        <HeaderCell stiff>
          <MaterialCheckbox
            size="small"
            checked={select.state.all}
            indeterminate={!select.state.all && !select.state.none}
            onChange={select.fns.onToggleAll}
          />
        </HeaderCell>
      `;
    }
  }

  // cell select

  let cellSelect = '';

  if (select.enabled && select.checkbox) {
    cellSelect = '<CellSelect item={item} />';

    if (select.thirdParty) {
      cellSelect = `
        <Cell stiff>
          <MaterialCheckbox
            size="small"
            checked={select.state.ids.includes(item.id)}
            onChange={() => select.fns.onToggleById(item.id)}
          />
        </Cell>
      `;
    }
  }

  // tableComponentOpen

  let tableComponentOpen = `
    <Table
      data={data}
      theme={theme}
  `;

  if (sort.enabled) {
    tableComponentOpen = `
      ${tableComponentOpen}
      sort={sort}
    `;
  }

  if (select.enabled) {
    tableComponentOpen = `
      ${tableComponentOpen}
      select={select}
  `;
  }

  if (tree.enabled) {
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

  if (tree.enabled) {
    firstCellComponent = `<CellTree item={item}>{item.name}</CellTree>`;
  }

  return `
    () => {
      const data = { nodes };

      const theme = useTheme(THEME);

      ${hooks}

      ${callbackHandlers}

      return (
        ${tableComponentOpen}
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  ${headerCellSelect}
                  <${headerCellComponentTag} ${headerCellComponentProps} ${
    sort.enabled ? 'sortKey="Task"' : ''
  }>Task</${headerCellComponentTag}>
                  <${headerCellComponentTag} ${headerCellComponentProps} ${
    sort.enabled ? 'sortKey="Deadline"' : ''
  }>Deadline</${headerCellComponentTag}>
                  <${headerCellComponentTag} ${headerCellComponentProps} ${
    sort.enabled ? 'sortKey="Type"' : ''
  }>Type</${headerCellComponentTag}>
                  <${headerCellComponentTag} ${headerCellComponentProps} ${
    sort.enabled ? 'sortKey="Complete"' : ''
  }>Complete</${headerCellComponentTag}>
                  <${headerCellComponentTag} ${headerCellComponentProps} ${
    sort.enabled ? 'sortKey="Tasks"' : ''
  }>Tasks</${headerCellComponentTag}>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    ${cellSelect}
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

  if (resize.enabled) {
  }

  if (sort.enabled) {
    imports = `
      ${imports}
      import {
        useSort,
        HeaderCellSort,
      } from '@table-library/react-table-library/sort';
    `;
  }

  if (select.enabled) {
    imports = `
      ${imports}
      import {
        useRowSelect,
        HeaderCellSelect,
        CellSelect,
        SelectClickTypes,
        SelectTypes,
      } from '@table-library/react-table-library/select';
    `;

    if (select.thirdParty) {
      imports = `
        ${imports}
        import MaterialCheckbox from '@mui/material/Checkbox';
      `;
    }
  }

  if (tree.enabled) {
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

  const [features, setFeatures] = React.useState({
    resize: {
      enabled: false,
    },
    sort: {
      enabled: false,
    },
    select: {
      enabled: false,
    },
    tree: {
      enabled: false,
    },
  });

  React.useEffect(() => {
    setLiveEditorView(LIVE_EDTIOR_VIEWS[0]);
  }, [features]);

  const code = getCode(liveEditorView, features);

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
          SelectClickTypes,
          SelectTypes,

          useTree,
          CellTree,

          MaterialCheckbox,
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
              <Wizard features={features} setFeatures={setFeatures} />
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
