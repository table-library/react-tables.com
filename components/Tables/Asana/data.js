const getDateWithOffset = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date;
};

const users = [
  {
    gender: 'female',
    name: {
      title: 'Miss',
      first: 'Louane',
      last: 'Vidal',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/women/88.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/88.jpg',
      thumbnail:
        'https://randomuser.me/api/portraits/thumb/women/88.jpg',
    },
    nat: 'FR',
  },
  {
    gender: 'male',
    name: {
      title: 'Mr',
      first: 'Don',
      last: 'White',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/38.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/38.jpg',
      thumbnail:
        'https://randomuser.me/api/portraits/thumb/men/38.jpg',
    },
    nat: 'IE',
  },
  {
    gender: 'male',
    name: {
      title: 'Mr',
      first: 'Loan',
      last: 'Lucas',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/3.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/3.jpg',
      thumbnail:
        'https://randomuser.me/api/portraits/thumb/men/3.jpg',
    },
    nat: 'FR',
  },
  {
    gender: 'male',
    name: {
      title: 'Monsieur',
      first: 'Arno',
      last: 'Brun',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/23.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/23.jpg',
      thumbnail:
        'https://randomuser.me/api/portraits/thumb/men/23.jpg',
    },
    nat: 'CH',
  },
  {
    gender: 'female',
    name: {
      title: 'Miss',
      first: 'Aubrey',
      last: 'Martin',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/women/18.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/18.jpg',
      thumbnail:
        'https://randomuser.me/api/portraits/thumb/women/18.jpg',
    },
    nat: 'CA',
  },
  {
    gender: 'female',
    name: {
      title: 'Miss',
      first: 'Julia',
      last: 'Smith',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/women/84.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/84.jpg',
      thumbnail:
        'https://randomuser.me/api/portraits/thumb/women/84.jpg',
    },
    nat: 'CA',
  },
  {
    gender: 'female',
    name: {
      title: 'Miss',
      first: 'Guro',
      last: 'Røstad',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/women/48.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/48.jpg',
      thumbnail:
        'https://randomuser.me/api/portraits/thumb/women/48.jpg',
    },
    nat: 'NO',
  },
];

export const nodes = [
  // Goals
  {
    id: '1',
    category: 'Goal',
    icon: 'Task',
    task: 'Kick off meeting with leadership',
    date: getDateWithOffset(1),
    deadline: getDateWithOffset(3),
    status: 'Complete',
    comments: [
      {
        user: users[3],
        text: 'asdasdasd',
      },
      {
        user: users[2],
        text: 'asdasdartyj4sd',
      },
      {
        user: users[3],
        text: '345yh3',
      },
      {
        user: users[2],
        text: '23r23r23r23r',
      },
    ],
    upvotes: 3,
    user: users[0],
    nodes: [
      {
        id: '111',
        category: 'Goal',
        icon: 'Task',
        task: 'Prepare Meeting',
        date: getDateWithOffset(1),
        status: 'Complete',
        comments: [
          {
            user: users[1],
            text: 'twegfw',
          },
          {
            user: users[6],
            text: 'wef',
          },
        ],
        upvotes: 0,
        user: users[0],
      },
      {
        id: '122',
        category: 'Goal',
        icon: 'Task',
        task: 'Invite for Meeting',
        date: getDateWithOffset(1),
        status: 'Complete',
        comments: [],
        upvotes: 0,
        user: users[1],
      },
    ],
  },
  {
    id: '2',
    category: 'Goal',
    icon: 'Task',
    task: 'Assign nodes to objective owners for drafting goals',
    date: getDateWithOffset(3),
    deadline: getDateWithOffset(6),
    status: 'Complete',
    comments: [],
    upvotes: 6,
    user: users[1],
  },
  {
    id: '3',
    category: 'Goal',
    icon: 'Task',
    task: 'Review draft goals with executive team',
    date: getDateWithOffset(2),
    deadline: getDateWithOffset(7),
    status: 'Complete',
    comments: [],
    upvotes: 0,
    user: users[2],
  },
  {
    id: '4',
    category: 'Goal',
    icon: 'Task',
    task: 'Update objectives based on feedback',
    date: getDateWithOffset(5),
    status: 'In Progress',
    comments: [
      {
        user: users[5],
        text: 'ttwqr23r223',
      },
    ],
    upvotes: 0,
    user: users[2],
    nodes: [
      {
        id: '41',
        category: 'Goal',
        icon: 'Task',
        task: 'Release Feedback',
        date: getDateWithOffset(4),
        status: 'Complete',
        comments: [],
        upvotes: 2,
        user: users[0],
      },
    ],
  },
  {
    id: '5',
    category: 'Goal',
    icon: 'Personal',
    task: 'Final approval on team objectives',
    date: getDateWithOffset(7),
    deadline: getDateWithOffset(12),
    status: 'Complete',
    comments: [
      {
        user: users[3],
        text: '345yh3',
      },
      {
        user: users[2],
        text: '23r23r23r23r',
      },
    ],
    upvotes: 0,
    user: users[1],
  },
  // Rollouts
  {
    id: '6',
    category: 'Rollout',
    icon: 'Task',
    task: 'Create a communications plan to share team goals',
    date: getDateWithOffset(12),
    status: 'Complete',
    comments: [
      {
        user: users[3],
        text: 'asdasdasd',
      },
      {
        user: users[2],
        text: 'asdasdartyj4sd',
      },
      {
        user: users[3],
        text: '345yh3',
      },
      {
        user: users[2],
        text: '23r23r23r23r',
      },
      {
        user: users[3],
        text: 'asdasdasd',
      },
      {
        user: users[2],
        text: 'asdasdartyj4sd',
      },
      {
        user: users[3],
        text: '345yh3',
      },
      {
        user: users[2],
        text: '23r23r23r23r',
      },
    ],
    upvotes: 3,
    user: users[3],
    nodes: [
      {
        id: '61',
        category: 'Rollout',
        icon: 'Personal',
        task: 'Speak to Marketing',
        date: getDateWithOffset(12),
        status: 'Complete',
        comments: [],
        upvotes: 1,
        user: users[3],
      },
    ],
  },
  {
    id: '7',
    category: 'Rollout',
    icon: 'Task',
    task: 'Post status update in Asana project',
    date: getDateWithOffset(13),
    deadline: getDateWithOffset(15),
    status: 'In Progress',
    comments: [],
    upvotes: 1,
    user: users[4],
  },
  {
    id: '8',
    category: 'Rollout',
    icon: 'Task',
    task: 'Draft comms post',
    date: getDateWithOffset(15),
    status: 'In Progress',
    comments: [],
    upvotes: 0,
    user: users[5],
  },
  // Tracking
  {
    id: '9',
    category: 'Tracking',
    icon: 'Task',
    task: 'Create an Asana Portfolio to track projects towards each objective',
    date: getDateWithOffset(21),
    deadline: getDateWithOffset(23),
    status: 'Blocked',
    comments: [
      {
        user: users[3],
        text: '345yh3',
      },
      {
        user: users[2],
        text: '23r23r23r23r',
      },
    ],
    upvotes: 0,
    user: users[6],
  },
  {
    id: '10',
    category: 'Tracking',
    icon: 'Task',
    task: 'Share objectives Asana Portfolio with other stakeholders',
    date: getDateWithOffset(23),
    status: 'Blocked',
    comments: [
      {
        user: users[3],
        text: 'asdasdasd',
      },
      {
        user: users[2],
        text: 'asdasdartyj4sd',
      },
      {
        user: users[3],
        text: '345yh3',
      },
    ],
    upvotes: 1,
    user: users[6],
  },
  {
    id: '11',
    category: 'Tracking',
    icon: 'Task',
    task: 'Set up recurring tasks for project owners to post status updates',
    date: getDateWithOffset(25),
    status: 'Blocked',
    comments: [],
    upvotes: 0,
    user: users[2],
  },
];
