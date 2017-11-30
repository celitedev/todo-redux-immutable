import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { shouldComponentUpdate as shouldPureComponentUpdate } from 'react-addons-pure-render-mixin';

import Todo from './Todo';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldPureComponentUpdate.bind(this);
  }

  componentWillMount() {
    this.props.fetchTodo();
  }

  render() {
    const { todos, loading, completeTodo, deleteTodo } = this.props;
    if (loading) {
      return (
        <div>
          loading todos...
        </div>
      )
    }

    return (
      <div>
        {todos.map(todo => (
          <Todo
            key={todo.get('id')}
            id={todo.get('id')}
            title={todo.get('title')}
            completed={todo.get('completed')}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    );
  }
}

Todos.propTypes = {
  todos: ImmutablePropTypes.list.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  completeTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  fetchTodo: PropTypes.func.isRequired,
};

export default Todos;
