import React from 'react'
import axios from 'axios'

import {
  Route,
  Switch,
  Link,
} from 'react-router-dom'

import {
  SEO,
  AppTemplate,
} from 'components'

import {
  Todo,
  NoMatch,
} from 'containers'

const App = props => {
  return (
    <AppTemplate>
      {/* meta tag configure */}
      <SEO
        title={ 'Toy TODO project' }
        link={ [{
          rel: 'canonical',
          href: window.location.href }] }
      />
      {/*routes*/}
      <Switch>
        <Route exact path='/' component={ Todo }/>
        <Route path='/todo/:id' component={ Todo }/>
        <Route path='/filter/:filter' component={ Todo }/>
        <Route path='' component={ NoMatch }/>
      </Switch>
    </AppTemplate>
  )
}

export default App
