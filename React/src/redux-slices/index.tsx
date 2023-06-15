import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../App';
import { useDispatch, useSelector } from 'react-redux';

type SliceState = {
  todos: Todo[];
};
const initialState: SliceState = {
  todos: [],
};

const slice = createSlice({
  initialState,
  name: 'Todo-Slice',
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = [...state.todos, action.payload];
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(({ id }) => id !== action.payload);
    },
  },
});

export const useReduxTodo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: SliceState) => state.todos);
  const addTodo = (todo: Todo) => dispatch(slice.actions.addTodo(todo));
  const removeTodo = (id: number) => dispatch(slice.actions.removeTodo(id));
  return { todos, addTodo, removeTodo };
};
export default slice.reducer;
