export const COMPLETE_TODO = 'COMPLETE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const FETCH_TODO_REQUEST = 'FETCH_TODO_REQUEST';
export const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS';
export const FETCH_TODO_FAIL = 'FETCH_TODO_FAIL';

export const fetchTodo = () => ({
  type: FETCH_TODO_REQUEST
});

export const fetchTodoSuccess = (todos) => ({
  type: FETCH_TODO_SUCCESS,
  todos
});

export const fetchTodoFail = (error) => ({
  type: FETCH_TODO_FAIL,
  error
});

export const completeTodo = id => ({
  type: COMPLETE_TODO,
  id
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id
});
