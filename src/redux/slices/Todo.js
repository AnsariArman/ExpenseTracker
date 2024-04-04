import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  todos: [],
  loading: false,
};
export const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, action) => {
      state.todos.unshift(action.payload);
    },
    deleted: (state, action) => {
      state.loading = true;
      state.todos =  state.todos.filter(item => {
        return item.id !== action.payload;
      });
    },
  },
});

export const {add, deleted} = TodoSlice.actions;
export default TodoSlice.reducer;
