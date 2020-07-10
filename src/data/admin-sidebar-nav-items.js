export default function () {
  return [{
    title: 'Dashboard',
    to: {
      name: 'admin-dashboard',
    },
    htmlBefore: '<i class="material-icons">view_module</i>',
    htmlAfter: '',
  }, {
    title: 'Users',
    htmlBefore: '<i class="material-icons">person</i>',
    to: {
      name: 'users',
    },
  }, {
    title: 'Budget Settings',
    htmlBefore: '<i class="material-icons">settings</i>',
    to: {
      name: 'budget-settings',
    },
  },
  {
    title: 'Departments',
    htmlBefore: '<i class="material-icons">table_chart</i>',
    to: {
      name: 'departments',
    },
  }, {
    title: 'Units',
    htmlBefore: '<i class="material-icons">vertical_split</i>',
    to: {
      name: 'unit',
    },
  },
  ];
}