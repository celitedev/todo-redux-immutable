import React, { Component, PropTypes } from 'react';
import styles from './Input.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const title = e.target.value;
    if (e.which === 13 && title.trim() !== '') {
      this.props.addTodo(title);
      this.setState({ title: '' });
    }
  }

  handleChange(e) {
    this.setState({ title: e.target.value });
  }

  render() {
    const { canShowCaret } = this.props;
    return (
      <div className={styles.input}>
        {canShowCaret ?
          <span className={styles.caret} /> :
          <span className={styles.spacer} />
        }
        <input
          className={styles.text}
          type="text"
          placeholder="What needs to be done? Add more todos..."
          value={this.state.title}
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit}
        />
      </div>
    );
  }
}

Input.propTypes = {
  canShowCaret: PropTypes.bool.isRequired,
  addTodo: PropTypes.func.isRequired
};

export default Input;
