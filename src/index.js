import 'react-hot-loader/patch' // to prevent error, need to import very first.
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { AppContainer as HotContainer } from 'react-hot-loader'
// Root Component
import Root from './Root'
// CSS
import { reset, theme } from 'styles'
// Redux Store
import store from 'store'

const render = Component => ReactDOM.render(
  (
    <HotContainer>
      <Component store={ store } theme={ theme } />
    </HotContainer>
  ),
  document.getElementById('root')
)
render(Root)

if(module.hot) {
  module.hot.accept('./Root', () => render(Root))
}

registerServiceWorker()
