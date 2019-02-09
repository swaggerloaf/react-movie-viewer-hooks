import * as types from './actionTypes';

export function createTodo(todo) {
  return { type: types.CREATE_TODO, todo };
}
