/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import todosReducer, { initialState } from './todosReducer';

import { ADD_TODO } from './../app/input/inputActions';
import { COMPLETE_TODO } from './../app/todos/todosActions';
import { CLEAR_COMPLETED } from './../app/footer/footerActions';

import Immutable, { Map, List } from 'immutable';

describe('Todos Reducer', () => {
  const testState1 = initialState.update('data', data => data.push(Map({
    id: 0,
    title: 'Buy milk',
    completed: false
  })));

  const testState2 = testState1.update('data', data => data.push(Map({
    id: 1,
    title: 'Buy eggs',
    completed: false
  })));

  const testState3 = initialState.update('data', data => data.push(Map({
    id: 0,
    title: 'Buy eggs',
    completed: true
  })));

  it('should handle initial state', () => {
    expect(
      todosReducer(undefined, {})
    ).to.equal(initialState);
  });

  it('should handle ADD_TODO', () => {
    expect(Immutable.is(
      todosReducer(initialState, {
        type: ADD_TODO,
        title: 'Buy milk'
      }),
      testState1
    )).to.be.true;

    expect(Immutable.is(
      todosReducer(testState1, {
        type: ADD_TODO,
        title: 'Buy eggs'
      }),
      testState2
    )).to.be.true;
  });

  it('should handle COMPLETE_TODO', () => {
    expect(Immutable.is(
      todosReducer(testState1, {
        type: COMPLETE_TODO,
        id: 0
      }),
      testState1.update('data', data => data.map(todo =>
        todo.get('id') === 0 ?
          todo.set('completed', !todo.get('completed')) :
          todo
      ))
    )).to.be.true;
  });

  it('should handle CLEAR_COMPLETED', () => {
    expect(Immutable.is(
      todosReducer(testState3, {
        type: CLEAR_COMPLETED
      }),
      initialState
    )).to.be.true;
  });
});

