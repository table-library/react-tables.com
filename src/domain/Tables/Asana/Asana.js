/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import clsx from 'clsx';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  Cell,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import {
  useSort,
  HeaderCellSort,
} from '@table-library/react-table-library/sort';
import {
  TreeExpandClickTypes,
  useTree,
} from '@table-library/react-table-library/tree';
import {
  findNodeById,
  insertNode,
} from '@table-library/react-table-library/common';

import { TableThemeProvider, AlignCenter, Ellipse } from '../shared';
import {
  CATEGORY_MAPPING,
  ICON_MAPPING,
  STATUS_MAPPING,
  STATUS_TOGGLE_TRANSITION,
} from './config';
import {
  SHARED_THEME,
  PRIMARY_THEME,
  SECONDARY_THEME,
} from './theme';
import { Category } from './styles';
import { nodes } from './data';

const CommentTable = ({ data }) => {
  const theme = useTheme([SHARED_THEME, SECONDARY_THEME]);

  return (
    <Table data={data} theme={theme}>
      {(tableListSecondary) => (
        <Body>
          {tableListSecondary.map((item) => (
            <Row key={item.id} item={item}>
              <Cell>
                <AlignCenter>
                  <img
                    alt="avatar"
                    src={item.user.picture.thumbnail}
                    style={{ borderRadius: '50%' }}
                    width={20}
                    height={20}
                  />
                  &nbsp;
                  <Ellipse style={{ fontWeight: 'bold' }}>
                    {item.user.name.first}&nbsp;
                    {item.user.name.last}:&nbsp;
                  </Ellipse>
                  <Ellipse>{item.text}</Ellipse>
                </AlignCenter>
              </Cell>
            </Row>
          ))}
        </Body>
      )}
    </Table>
  );
};

const AsanaRow = ({
  item,
  isFirst,
  upvotes,
  onUpvote,
  expands,
  onExpand,
  trees,
  onTree,
  edits,
  onEdit,
  onEditCommit,
  onToggleStatus,
}) => {
  const isUpvoted = upvotes.includes(item.id);
  const isExpanded = expands.includes(item.id);
  const isTreeed = trees.includes(item.id);
  const isEdit = edits.includes(item.id);

  return (
    <>
      <Row item={item} className={clsx({ first: isFirst })}>
        <Cell>
          <AlignCenter spaceBetween>
            <AlignCenter style={{ minWidth: '20px' }}>
              {React.cloneElement(ICON_MAPPING[item.icon], {
                fontSize: 'small',
              })}
              &nbsp;
              {isEdit ? (
                <Input
                  sx={{ fontSize: '14px' }}
                  defaultValue={item.task}
                  onChange={(event) =>
                    onEditCommit(event.target.value)
                  }
                />
              ) : (
                <Ellipse onClick={() => onEdit(item.id)}>
                  {item.task}
                </Ellipse>
              )}
            </AlignCenter>
            <AlignCenter>
              {isEdit && (
                <>
                  &nbsp;
                  <Button
                    startIcon={
                      <CheckCircleOutline fontSize="small" />
                    }
                    variant="outlined"
                    size="small"
                    onClick={() => onEdit(item.id)}
                  >
                    Approve
                  </Button>
                </>
              )}
              {!!item.upvotes && !isEdit && (
                <>
                  &nbsp;
                  <Button
                    startIcon={
                      isUpvoted ? (
                        <ThumbUpIcon fontSize="small" />
                      ) : (
                        <ThumbUpOutlinedIcon fontSize="small" />
                      )
                    }
                    variant="outlined"
                    size="small"
                    onClick={() => onUpvote(item.id)}
                  >
                    {isUpvoted ? item.upvotes + 1 : item.upvotes}
                  </Button>
                </>
              )}
              {!!item.comments.length && !isEdit && (
                <>
                  &nbsp;
                  <Button
                    startIcon={
                      isExpanded ? (
                        <ChatBubbleOutlinedIcon fontSize="small" />
                      ) : (
                        <ChatBubbleOutlineOutlinedIcon fontSize="small" />
                      )
                    }
                    variant="outlined"
                    size="small"
                    onClick={() => onExpand(item.id)}
                  >
                    {item.comments.length}
                  </Button>
                </>
              )}
              {!!item.nodes?.length && !isEdit && (
                <>
                  &nbsp;
                  <Button
                    startIcon={
                      isTreeed ? (
                        <AccountTreeIcon fontSize="small" />
                      ) : (
                        <AccountTreeOutlinedIcon fontSize="small" />
                      )
                    }
                    variant="outlined"
                    size="small"
                    onClick={() => onTree(item.id)}
                  >
                    {item.nodes?.length}
                  </Button>
                </>
              )}
            </AlignCenter>
          </AlignCenter>
        </Cell>
        <Cell>
          <AlignCenter>
            <img
              alt="avatar"
              src={item.user.picture.thumbnail}
              style={{ borderRadius: '50%' }}
              width={20}
              height={20}
            />
            &nbsp;
            <Ellipse>
              {item.user.name.first}&nbsp;
              {item.user.name.last}
            </Ellipse>
          </AlignCenter>
        </Cell>
        <Cell>
          {item.date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
          })}
          {item.deadline && (
            <>
              &nbsp;-&nbsp;
              {item.deadline.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
              })}
            </>
          )}
        </Cell>
        <Cell>
          <Chip
            label={item.status}
            sx={{
              fontWeight: 'normal',
              backgroundColor: STATUS_MAPPING[item.status],
            }}
            size="small"
            component="button"
            onClick={() => onToggleStatus(item.id)}
          />
        </Cell>
      </Row>

      {isExpanded && <CommentTable data={{ nodes: item.comments }} />}
    </>
  );
};

const isCategory = (category) => (item) => item.category === category;

const CategoryTable = ({
  tableList,
  category,
  collapsed,
  onCollapse,
  ...props
}) => {
  const isCollapsed = collapsed.includes(category.key);

  return (
    <>
      <Category>
        <IconButton
          size="small"
          onClick={() => onCollapse(category.key)}
        >
          {isCollapsed ? (
            <ArrowRightIcon fontSize="small" />
          ) : (
            <ArrowDropDownIcon fontSize="small" />
          )}
        </IconButton>
        &nbsp;
        <span>{category.label}</span>
      </Category>

      {tableList
        .filter(isCategory(category.key))
        .filter(() => !isCollapsed)
        .map((item, index) => (
          <AsanaRow
            key={item.id}
            item={item}
            isFirst={index === 0}
            {...props}
          />
        ))}
    </>
  );
};

const AsanaTable = () => {
  const theme = useTheme([SHARED_THEME, PRIMARY_THEME]);

  const [data, setData] = React.useState({ nodes });

  // collapse

  const [collapsed, setCollapsed] = React.useState([]);

  const handleCollapse = (key) => {
    if (collapsed.includes(key)) {
      setCollapsed(collapsed.filter((value) => value !== key));
    } else {
      setCollapsed(collapsed.concat(key));
    }
  };

  // sort

  const sort = useSort(
    data,
    {
      state: {
        sortKey: 'DUE_DATE',
        reverse: true,
      },
    },
    {
      sortIcon: {
        margin: '0px',
        iconDefault: null,
        iconUp: <ArrowDropUpIcon fontSize="small" />,
        iconDown: <ArrowDropDownIcon fontSize="small" />,
      },
      sortFns: {
        TASK: (array) =>
          array.sort((a, b) => a.task.localeCompare(b.task)),
        ASSIGNEE: (array) =>
          array.sort((a, b) =>
            `${a.user.name.first} ${a.user.name.last}`.localeCompare(
              `${b.user.name.first} ${b.user.name.last}`
            )
          ),
        DUE_DATE: (array) => array.sort((a, b) => a.date - b.date),
        STATUS: (array) =>
          array.sort((a, b) => a.status.localeCompare(b.status)),
      },
    }
  );

  // upvote

  const [upvotes, setUpvotes] = useLocalStorageState('upvotes', {
    defaultValue: [],
  });

  const handleUpvote = (id) => {
    if (upvotes.includes(id)) {
      setUpvotes(upvotes.filter((value) => value !== id));
    } else {
      setUpvotes(upvotes.concat(id));
    }
  };

  // expand

  const [expands, setExpands] = useLocalStorageState('expands', {
    defaultValue: [],
  });

  const handleExpand = (id) => {
    if (expands.includes(id)) {
      setExpands(expands.filter((value) => value !== id));
    } else {
      setExpands(expands.concat(id));
    }
  };

  // edits

  const [edits, setEdits] = useLocalStorageState('edits', {
    defaultValue: [],
  });

  const handleEdit = (id) => {
    if (edits.includes(id)) {
      setEdits(edits.filter((value) => value !== id));
    } else {
      setEdits(edits.concat(id));
    }
  };

  const handleEditCommit = (id, text) => {
    const node = findNodeById(data.nodes, id);
    const editedNode = {
      ...node,
      task: text,
    };
    const nodes = insertNode(data.nodes, editedNode);

    setData({ nodes });
  };

  // tree

  const tree = useTree(data, null, {
    clickType: TreeExpandClickTypes.ButtonClick,
  });

  const handleTree = (id) => {
    tree.fns.onToggleById(id);
  };

  // status

  const handleToggleStatus = (id) => {
    const node = findNodeById(data.nodes, id);
    const editedNode = {
      ...node,
      status: STATUS_TOGGLE_TRANSITION[node.status],
    };
    const nodes = insertNode(data.nodes, editedNode);

    setData({ nodes });
  };

  return (
    <Table
      data={data}
      theme={theme}
      layout={{ custom: true, horizontalScroll: true }}
      sort={sort}
      tree={tree}
    >
      {(tableList) => {
        const sharedProps = {
          tableList: tableList,
          collapsed: collapsed,
          onCollapse: handleCollapse,
          upvotes,
          onUpvote: handleUpvote,
          expands,
          onExpand: handleExpand,
          trees: tree.state.ids,
          onTree: handleTree,
          edits,
          onEdit: handleEdit,
          onEditCommit: handleEditCommit,
          onToggleStatus: handleToggleStatus,
        };

        return (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort sortKey="TASK" resize>
                  Task Name
                </HeaderCellSort>
                <HeaderCellSort sortKey="ASSIGNEE" resize>
                  Assignee
                </HeaderCellSort>
                <HeaderCellSort sortKey="DUE_DATE" resize>
                  Due Date
                </HeaderCellSort>
                <HeaderCellSort sortKey="STATUS">
                  Status
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              <CategoryTable
                category={CATEGORY_MAPPING.Goal}
                {...sharedProps}
              />

              <CategoryTable
                category={CATEGORY_MAPPING.Rollout}
                {...sharedProps}
              />

              <CategoryTable
                category={CATEGORY_MAPPING.Tracking}
                {...sharedProps}
              />
            </Body>
          </>
        );
      }}
    </Table>
  );
};

export const Asana = () => (
  <TableThemeProvider>
    <AsanaTable />
  </TableThemeProvider>
);
