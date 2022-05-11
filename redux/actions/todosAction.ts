import { ITodoItem } from "../../interfaces";
import { actionType } from "../actionType";

export const addTodo = (item: ITodoItem) => ({ type: actionType.ADD, item });
export const deleteTodo = (item: ITodoItem) => ({ type: actionType.DELETE, item });
export const editTodo = (item: ITodoItem) => ({ type: actionType.EDIT, item });
export const markTodo = (item: ITodoItem) => ({ type: actionType.MARK, item });
