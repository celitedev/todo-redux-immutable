import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import request from '../utils/request';
import { FETCH_TODO_REQUEST, fetchTodoSuccess, fetchTodoFail } from '../app/todos/todosActions';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchTodo(action) {
   try {
      const todos = yield call(request,'http://jsonplaceholder.typicode.com/todos?userId=1');
      yield put(fetchTodoSuccess(todos));
   } catch (e) {
      yield put(fetchTodoFail(e));
   }
}

function* mySaga() {
  yield takeLatest(FETCH_TODO_REQUEST, fetchTodo);
}

export default mySaga;