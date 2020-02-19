const InitialState = {
  teams: [
    {
      name: 'Client Services',
      id: 'CS',
      color: '#EEC0C6',
      teamProfile: [
        {
          type: 'senior',
          cost: 100,
          experience: 7
        },
        {
          type: 'junior',
          cost: 50,
          experience: 5
        }
      ]
    },
    {
      name: 'User Experience',
      id: 'UX',
      color: '#FFF07C',
      teamProfile: [
        {
          type: 'senior',
          cost: 100,
          productivity: 5
        },
        {
          type: 'junior',
          cost: 50,
          productivity: 3
        }
      ]
    },
    {
      name: 'Visual Design',
      id: 'VD',
      color: '#80FF72',
      teamProfile: [
        {
          type: 'senior',
          cost: 100,
          productivity: 5
        },
        {
          type: 'junior',
          cost: 50,
          productivity: 3
        }
      ]
    },
    {
      name: 'Engineering',
      id: 'E',
      color: '#7EE8FA',
      teamProfile: [
        {
          type: 'senior',
          cost: 100,
          productivity: 5
        },
        {
          type: 'junior',
          cost: 50,
          productivity: 3
        }
      ]
    }
  ],
  project: {
    length: 30,
    budget: 1500,
    workLoad: {
      ux: 80,
      vd: 100,
      e: 150
    },
    client: {
      happiness: 100,
      fussiness: 50
    }
  },
  current: {
    currentDay: null,
    totalDays: 0,
    started: false,
    clientHappiness: 100,
    phases: [
      { id: 'cs', active: false, daysCompleted: 0 },
      { id: 'ux', active: false, daysCompleted: 0 },
      { id: 'vd', active: false, daysCompleted: 0 },
      { id: 'e', active: false, daysCompleted: 0 }
    ],
    interupt: {},
    teams: [
      {
        name: 'Client Services',
        id: 'CS',
        count: {
          junior: 0,
          senior: 0
        },
        days: 0,
        cost: 0
      },
      {
        name: 'User Experience',
        id: 'UX',
        count: {
          junior: 0,
          senior: 0
        },
        days: 0,
        cost: 0
      },
      {
        name: 'Visual Design',
        id: 'VD',
        count: {
          junior: 0,
          senior: 0
        },
        days: 0,
        cost: 0
      },
      {
        name: 'Engineering',
        id: 'E',
        count: {
          junior: 0,
          senior: 0
        },
        days: 0,
        cost: 0
      }
    ]
  }
};

export default InitialState;
