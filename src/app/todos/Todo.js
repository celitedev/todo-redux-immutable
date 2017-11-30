import React, { Component, PropTypes } from 'react';
import { shouldComponentUpdate as shouldPureComponentUpdate } from 'react-addons-pure-render-mixin';

import styles from './Todo.css';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldPureComponentUpdate.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  completeTodo() { this.props.completeTodo(this.props.id); }
  deleteTodo() { this.props.deleteTodo(this.props.id); }

  render() {
    const { title, complete } = this.props;
    return (
      <div className={styles.todo}>
        <span
          className={complete ? `${styles.check} ${styles.completed}` : styles.check}
          onClick={this.completeTodo}
        />
        <span
          className={complete ? `${styles.text} ${styles.completed}` : styles.text}
        >
          {title}
        </span>
        <span
          className={styles.delete}
          onClick={this.deleteTodo}
        >x</span>
      </div>
    );
  }
}

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  complete: PropTypes.bool.isRequired,
  completeTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default Todo;
