export default function () {
  return [
    {
      title: 'Dashboard',
      to: {
        name: 'admin-dashboard',
      },
      htmlBefore: '<i class="material-icons">view_module</i>',
      htmlAfter: '',
    },
    {
      title: 'Users',
      htmlBefore: '<i class="material-icons">person</i>',
      to: {
        name: 'users',
      },
    },
    {
      title: 'Budget Settings',
      htmlBefore: '<i class="material-icons">settings</i>',
      to: {
        name: 'budget-settings',
      },
    },
    {
      title: 'Divisions Setup',
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: {
        name: 'divisions',
      },
    },
    {
      title: 'Departments',
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: {
        name: 'departments',
      },
    },
    {
      title: 'Units',
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: {
        name: 'unit',
      },
    },
    {
      title: 'Requisitions',
      htmlBefore: '<i class="material-icons">local_atm</i>',
      to: {
        name: 'requisitions',
      },
    },
    {
      title: 'Activity Logs',
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: {
        name: 'activity-logs',
      },
    },
  ];
}
