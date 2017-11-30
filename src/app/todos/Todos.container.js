import { connect } from 'react-redux';
import { completeTodo, deleteTodo, fetchTodo } from './todosActions';
import Todos from './Todos.view';

import { ALL, ACTIVE, COMPLETED } from './../../state/filterTypes';

const applyFilter = (todos, filter) => {
  switch (filter) {
    case ALL:
      return todos;
    case ACTIVE:
      return todos.filter(todo => !todo.get('completed'));
    case COMPLETED:
      return todos.filter(todo => todo.get('completed'));
    default:
      return todos;
  }
};

const mapStateToProps = state => ({
  todos: applyFilter(state.getIn(['todos', 'data']), state.get('filter')),
  loading: state.getIn(['todos', 'loading']),
  error: state.getIn(['todos', 'error'])
});

const mapDispatchToProps = dispatch => ({
  completeTodo: id => {
    dispatch(completeTodo(id));
  },
  deleteTodo: id => {
    dispatch(deleteTodo(id));
  },
  fetchTodo: () => {
    dispatch(fetchTodo());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
