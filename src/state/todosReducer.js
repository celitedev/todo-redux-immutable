import { Map, List, fromJS } from 'immutable';

import { ADD_TODO } from './../app/input/inputActions';
import { COMPLETE_TODO, DELETE_TODO, FETCH_TODO_REQUEST, FETCH_TODO_SUCCESS, FETCH_TODO_FAIL } from './../app/todos/todosActions';
import { CLEAR_COMPLETED } from './../app/footer/footerActions';

export const initialTodos = [
  {
    id: 0,
    title: 'Learn React & Redux',
    completed: false
  }, {
    id: 1,
    title: "Utilize Webpack's Hot Module Reloading",
    completed: false
  }, {
    id: 2,
    title: 'Set up Redux DevTools',
    completed: false
  }, {
    id: 3,
    title: 'Optimize using immutability :)',
    completed: false
  }
];

const initialState = fromJS({
  loading: false,
  error: '',
  data: []
});

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODO_REQUEST:
      return state
        .set('loading', true)
        .set('error', '');
    case FETCH_TODO_SUCCESS:
      return state
        .set('loading', false)
        .set('error', '')
        .set('data', fromJS(action.todos));
    case FETCH_TODO_FAIL:
      return state
        .set('loading', true)
        .set('error', action.error)
        .set('data', List([]));
    case ADD_TODO:
      return state
        .update('data', data => data.push(Map({
          id: state.get('data').reduce((maxId, todo) => Math.max(todo.get('id'), maxId), -1) + 1,
          title: action.title,
          completed: false
        })));
    case COMPLETE_TODO:
      return state
        .update('data', data => data.map(todo =>
          todo.get('id') === action.id ?
            todo.set('completed', !todo.get('completed')) :
            todo
        ));
    case DELETE_TODO:
      return state
        .update('data', data => data.filter(todo => todo.get('id') !== action.id));
    case CLEAR_COMPLETED:
      return state
        .update('data', data => data.filter(todo => !todo.get('completed')));
    default:
      return state;
  }
};

export default todosReducer;
