export default function () {
  return [{
    title: 'Dashboard',
    to: {
      name: 'dashboard',
    },
    htmlBefore: '<i class="material-icons">edit</i>',
    htmlAfter: '',
  }, {
    title: 'Department',
    htmlBefore: '<i class="material-icons">vertical_split</i>',
    to: {
      name: 'department',
    },
  }, {
    title: 'Budgets',
    htmlBefore: '<i class="material-icons">note_add</i>',
    to: {
      name: 'budget',
    },
  },
  {
    title: 'Administration',
    htmlBefore: '<i class="material-icons">person</i>',
    to: {
      name: 'user-profile-lite',
    },
  }];
}
