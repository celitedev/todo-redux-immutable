import { Map, List, fromJS } from 'immutable';

import { ADD_TODO } from './../app/input/inputActions';
import { COMPLETE_TODO, DELETE_TODO } from './../app/todos/todosActions';
import { CLEAR_COMPLETED } from './../app/footer/footerActions';

export const initialTodos = [
  {
    id: 0,
    title: 'Learn React & Redux',
    complete: false
  }, {
    id: 1,
    title: "Utilize Webpack's Hot Module Reloading",
    complete: false
  }, {
    id: 2,
    title: 'Set up Redux DevTools',
    complete: false
  }, {
    id: 3,
    title: 'Optimize using immutability :)',
    complete: false
  }
];

const initialState = fromJS({
  loading: false,
  error: '',
  data: []
});

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return state
        .update('data', data => data.push(Map({
          id: state.get('data').reduce((maxId, todo) => Math.max(todo.get('id'), maxId), -1) + 1,
          title: action.title,
          complete: false
        })));
    case COMPLETE_TODO:
      return state
        .update('data', data => data.map(todo =>
          todo.get('id') === action.id ?
            todo.set('complete', !todo.get('complete')) :
            todo
        ));
    case DELETE_TODO:
      return state
        .update('data', data => data.filter(todo => todo.get('id') !== action.id));
    case CLEAR_COMPLETED:
      return state
        .update('data', data => data.filter(todo => !todo.get('complete')));
    default:
      return state;
  }
};

export default todosReducer;
