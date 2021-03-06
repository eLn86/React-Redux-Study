import { createAction, handleActions } from 'redux-actions'
import * as api from '../api/todoAPI'
import { pender } from 'redux-pender'
import { Map, List } from 'immutable'
import { pipeMutations as _pipe } from 'libs'
import createSocketAction from '../middlewares/socket/createSocketAction'
import { createPenderAction } from 'redux-pender'


/* Action Types */
// Sync actions
export const TODO_INPUT = 'todo/TODO_INPUT'
export const TODO_ADD = 'todo/TODO_ADD'
export const TODO_TOGGLE = 'todo/TODO_TOGGLE'
export const TODO_DELETE = 'todo/TODO_DELETE'
export const TODO_CLEAR = 'todo/TODO_CLEAR'
export const TODO_UPDATE = 'todo/TODO_UPDATE'
// Async actions
export const TODO_FETCH = 'todo/TODO_FETCH'

/* Actions Creater */
// Sync actions
export const inputTodo = createAction(TODO_INPUT)
export const updateTodo = createAction(TODO_UPDATE)
// Async actions
export const fetchTodo = createAction(TODO_FETCH, api.fetchTodoAPI)
export const addTodo = createSocketAction(TODO_ADD, api.addTodoAPI)
export const toggleTodo = createSocketAction(TODO_TOGGLE, api.toggleTodoAPI)
export const deleteTodo = createSocketAction(TODO_DELETE, api.deleteTodoAPI)
export const clearTodo = createSocketAction(TODO_CLEAR, api.clearTodoAPI)


const initialState = Map({
  todos: List(),
  input: '',
  err: Map({ statue: false, msg: '' })
})

// Mutations
// use withMutations when you want to group several changes on an object.
// Belowed cases were for practicing, so over used.
const setInput = value => state => state.set('input', value)
const updateToggle = theTodo => state => state.update('todos', todos =>
  todos.map(todo => {
    return todo.id === theTodo.id ? theTodo : todo
  })
)
const addNew = todo => state => state.update('todos', todos =>
  todos.push(todo)
)
const deleteOne = id => state => state.update('todos', todos =>
  todos.filter(todo => todo.id !== id)
)
const clearSome = todos => state => state.set('todos', List(todos))

/* reducers with redux-pender */
const Todo = handleActions({
  [TODO_INPUT]: (state, action) =>
    _pipe([
      setInput(action.payload.input)
    ], state),
  [TODO_UPDATE]: (state, action) =>
    state.update('todos', todos => console.log(action) || todos.map(todo => {
      todo.willUnmount = todo.id === action.payload.id
      return todo
    })),
  [TODO_TOGGLE]: (state, action) =>
    _pipe([
      updateToggle(action.payload.data)
    ], state),
  [TODO_ADD]: (state, action) =>
    _pipe([
      addNew(action.payload.data)
    ], state),
  [TODO_DELETE]: (state, action) =>
    _pipe([
      deleteOne(action.payload.data),
    ], state),
  [TODO_CLEAR]: (state, action) =>
    _pipe([
      clearSome(action.payload.data),
    ], state),
  ...pender({
    type: TODO_FETCH,
    onSuccess: (state, action) =>
      state.set('todos', List(action.payload.data.todos)),
  }),
  ...pender({
    type: TODO_TOGGLE,
    onPending: (state, action) => state,
    onSuccess: (state, action) => state
  }),
}, initialState)

export default Todo
