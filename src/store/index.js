import configureStore from './configure'
import { fetchTodo } from 'store/modules/Todo'

const store = configureStore()

// get init fetching
store.dispatch(fetchTodo)

export default store
