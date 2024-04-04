import {configureStore} from '@reduxjs/toolkit';
import TodoSlice from '../slices/Todo';
import logger from 'redux-logger';
const store = configureStore({
  reducer: {
    todo: TodoSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
