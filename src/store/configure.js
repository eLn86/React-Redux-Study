import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import penderMiddleware from 'redux-pender'
import socketMiddleware from './middlewares/socket/'
import modules, { actionTypes } from './modules'

const isDev = process.env.NODE_ENV === 'development';

const devtools = isDev && window.devToolsExtension
  ? window.devToolsExtension
  : () => fn => fn;


const configureStore = preloadedState => {
  const enhancers = [
    applyMiddleware(
      thunk,
      socketMiddleware({
        actionTypes,
        path: '/'
      }),
      penderMiddleware(),
    ),
    devtools({
      actionsBlacklist: [null],
      maxAge: 1000
    })
  ]

  const store = createStore(
    modules,
    preloadedState,
    compose(...enhancers)
  )

  if(module.hot) {
    // for code splitting
    module.hot.accept('./modules', () => store.replaceReducer(modules))
  }

  return store
}

export default configureStore
