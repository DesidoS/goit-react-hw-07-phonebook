import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { contactReducer } from './contactsSlice';
import { filtersReducer } from './filtersSlice';

const rootReducer = combineReducers({
  contacts: contactReducer,
  filters: filtersReducer,
});

// const store = configureStore({
//   reducer: {
//     contacts: contactReducer,
//     filters: filtersReducer,
// devTools: process.env.NODE_ENV === 'development',
// middleware: getDefaultMiddleware => getDefaultMiddleware(),
//   },
// });
const store = configureStore({
  reducer: rootReducer,
});
export default store;
