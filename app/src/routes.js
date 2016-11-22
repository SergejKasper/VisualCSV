export default [{
    path: '/',
    name: 'landing-page',
    component: require('components/Persons')
  }, {
    path: '/person/:id',
    component: require('components/Person')
  }, {
    path: '*',
    redirect: '/'
  }
]
