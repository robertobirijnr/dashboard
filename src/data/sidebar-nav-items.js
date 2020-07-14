

export default function () {
  const auth = JSON.parse(localStorage.getItem('user'));
  console.log(auth);
  if (auth.user_role === 'BO') {
    return [{
      title: 'Dashboard',
      to: {
        name: 'admin-dashboard',
      },
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: '',
    }, {
      title: 'Budget Period',
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: {
        name: 'department',
      },
    },
    {
      title: 'Units Budget',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: {
        name: 'budget',
      },
    },
    ];
  }
  return [{
    title: 'Dashboard',
    to: {
      name: 'dashboard',
    },
    htmlBefore: '<i class="material-icons">edit</i>',
    htmlAfter: '',
  }, {
    title: 'Budget Priod',
    htmlBefore: '<i class="material-icons">vertical_split</i>',
    to: {
      name: 'department',
    },
  },
  ];
}
