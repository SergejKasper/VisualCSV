export default [{
    path: '/',
    name: 'csv',
    component: require('components/CSV')
  }, {
    path: '/row-edit/:id',
    component: require('components/RowEdit')
  }, {
    path: '*',
    redirect: '/'
  }
]
