import { connect } from 'react-redux';
import { clearCompleted, applyFilter } from './footerActions';
import { ALL, ACTIVE, COMPLETED } from './../../state/filterTypes';

import Footer from './Footer.view';

const mapStateToProps = state => ({
  showFooter: state.getIn(['todos', 'data']).size !== 0,
  canClearCompleted: state.getIn(['todos', 'data']).some(todo => todo.get('completed')),
  numIncomplete: state.getIn(['todos', 'data'])
    .reduce((count, todo) => !todo.get('completed') ? count + 1 : count, 0),
  showAll: state.get('filter') === ALL,
  showActive: state.get('filter') === ACTIVE,
  showCompleted: state.get('filter') === COMPLETED
});

const mapDispatchToProps = dispatch => ({
  clearCompleted: () => {
    dispatch(clearCompleted());
  },
  filterAll: () => {
    dispatch(applyFilter(ALL));
  },
  filterActive: () => {
    dispatch(applyFilter(ACTIVE));
  },
  filterCompleted: () => {
    dispatch(applyFilter(COMPLETED));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
