export default function () {
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
  }, {
    title: 'Units Bugest',
    htmlBefore: '<i class="material-icons">note_add</i>',
    to: {
      name: 'budget',
    },
  },
  ];
}
