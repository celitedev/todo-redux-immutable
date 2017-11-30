import { connect } from 'react-redux';
import Input from './Input.view';

import { addTodo } from './inputActions';

const mapStateToProps = state => ({
  canShowCaret: state.get('todos').size !== 0
});

const mapDispatchToProps = dispatch => ({
  addTodo: title => {
    dispatch(addTodo(title));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input);
