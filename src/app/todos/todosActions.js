export const COMPLETE_TODO = 'COMPLETE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const completeTodo = id => ({
  type: COMPLETE_TODO,
  id
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id
});
