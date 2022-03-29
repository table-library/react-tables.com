import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';

export const CATEGORY_MAPPING = {
  Goal: {
    key: 'Goal',
    label: 'Goal Creation',
  },
  Rollout: {
    key: 'Rollout',
    label: 'Rollout',
  },
  Tracking: {
    key: 'Tracking',
    label: 'Tracking & Reporting',
  },
};

export const ICON_MAPPING = {
  Task: <CheckCircleOutlineIcon />,
  Personal: <AccountBoxOutlinedIcon />,
};

export const STATUS_MAPPING = {
  Complete: 'green',
  'In Progress': 'orange',
  Blocked: 'red',
};

export const STATUS_TOGGLE_TRANSITION = {
  Complete: 'Blocked',
  Blocked: 'In Progress',
  'In Progress': 'Complete',
};
