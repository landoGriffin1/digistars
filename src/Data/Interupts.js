const Interupts = {
  ux: [
    {
      copy:
        'Client doesnt think the current user experience is right, the UX team think this will add 20 to the estimates.',
      btns: [
        {
          label: 'Accept the change and increase the estimates',
          result: {
            type: 'increaseEstimate',
            amnt: 20,
            team: 'ux'
          }
        },
        {
          label:
            'Accept the change, increase the estimates and tell the client you are increasing the project length',
          result: {
            type: 'increaseEstimateAndPLength',
            amnt: 20,
            projectLength: 2,
            team: 'ux'
          }
        },
        {
          label:
            'Go back to the client and tell them you are leaving the user experience as it is!',
          result: {
            type: 'refuseClient'
          }
        }
      ]
    }
  ],
  vd: [
    {
      copy:
        'Client doesnt think the Homepage Design is right, the Visual design team think this will add 5 to the estimates.',
      btns: [
        {
          label: 'Accept the change and increase the estimates',
          result: {
            type: 'increaseEstimate',
            amnt: 5,
            team: 'vd'
          }
        },
        {
          label:
            'Accept the change, increase the estimates and tell the client you are increasing the project length',
          result: {
            type: 'increaseEstimateAndPLength',
            amnt: 5,
            projectLength: 1,
            team: 'vd'
          }
        },
        {
          label:
            'Go back to the client and tell them you are leaving the user experience as it is!',
          result: {
            type: 'refuseClient'
          }
        }
      ]
    }
  ],
  e: [
    {
      copy: `You've discovered some extra complexity in the code that needs researching, the engineering team say it will add 10 to the estimates`,
      btns: [
        {
          label: 'Do the extra research',
          result: {
            type: 'increaseEstimate',
            amnt: 10,
            team: 'e'
          }
        },
        {
          label: 'Do the extra research but add extra time to the project',
          result: {
            type: 'increaseEstimateAndPLength',
            amnt: 10,
            projectLength: 2,
            team: 'e'
          }
        }
      ]
    }
  ]
};
export default Interupts;
