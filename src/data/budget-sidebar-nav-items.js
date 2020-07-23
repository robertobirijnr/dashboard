

export default function () {
  const auth = JSON.parse(localStorage.getItem('user'));
  // console.log(auth);
  if (auth.user_role === 'BO') {
    return [{
      title: 'Dashboard',
      to: {
        name: 'budget-dashboard',
      },
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: '',
    }, {
      title: 'Budget Period',
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: {
        name: 'budget-periods',
      },
    },
      {
        title: 'Units Budgets',
        htmlBefore: '<i class="material-icons">note_add</i>',
        to: {
          name: 'unit-budgets',
        },
      },
      {
        title: 'Salary Scale',
        htmlBefore: '<i class="material-icons">local_atm</i>',
        to: {
          name: 'salary-scale',
        },
      },
      {
        title: 'Implementations',
        htmlBefore: '<i class="material-icons">local_atm</i>',
        to: {
          name: 'salary-scale',
        },
      },
      {
        title: 'Requisitions',
        htmlBefore: '<i class="material-icons">local_atm</i>',
        to: {
          name: 'requisitions',
        },
      },
    ];
  }
  return [{
    title: 'Dashboard',
    to: {
      name: 'budget-dashboard',
    },
    htmlBefore: '<i class="material-icons">edit</i>',
    htmlAfter: '',
  }, {
    title: 'Budget Periods',
    htmlBefore: '<i class="material-icons">vertical_split</i>',
    to: {
      name: 'budget-periods',
    },
  },
    {
    title: 'Implementations',
    htmlBefore: '<i class="material-icons">vertical_split</i>',
    to: {
      name: 'budget-periods',
    },
  },
    {
    title: 'Requisitions',
    htmlBefore: '<i class="material-icons">vertical_split</i>',
    to: {
      name: 'requisitions',
    },
  },
  ];
}
