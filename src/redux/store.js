import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { contactReducer } from './contactsSlice';
import { filtersReducer } from './filtersSlice';

const rootReducer = combineReducers({
  contacts: contactReducer,
  filters: filtersReducer,
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
