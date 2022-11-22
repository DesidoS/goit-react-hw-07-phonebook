import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, deleteContact } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.pending]: handlePending,
    [fetchContacts.rejected]: handleRejected,
  },
  [addContacts.fulfilled](state, action) {
    state.isLoading = false;
    state.error = null;
    state.items.push(action.payload);
  },
  [addContacts.pending]: handlePending,
  [addContacts.rejected]: handleRejected,
  [deleteContact.fulfilled](state, action) {
    state.isLoading = false;
    state.error = null;
    const index = state.items.findIndex(
      contact => contact.id === action.payload.id
    );
    state.items.splice(index, 1);
  },
  [deleteContact.pending]: handlePending,
  [deleteContact.rejected]: handleRejected,
});

export const contactReducer = contactSlice.reducer;
