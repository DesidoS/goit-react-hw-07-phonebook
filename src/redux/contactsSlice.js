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
  reducers: {
    // addContacts: {
    //   reducer(state, action) {
    //     state.push(action.payload);
    //   },
    // },
  },
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected]: handleRejected,
    [addContacts.pending]: handlePending,
    [addContacts.fulfilled](state, action) {
      console.log('state', state);
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addContacts.rejected]: handleRejected,
    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled](state, action) {
      console.log('state', state);
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
    [deleteContact.rejected]: handleRejected,
  },
});

export const contactReducer = contactSlice.reducer;

// {
//   "id": "1",
//   "name": "Rosie Simpson",
//   "number": "459-12-56",
//   "type": "mobile"
// },
// {
//   "id": "2",
//   "name": "Hermione Kline",
//   "number": "443-89-12",
//   "type": "mobile"
// },
// {
//   "id": "3",
//   "name": "Eden Clements",
//   "number": "645-17-79",
//   "type": "mobile"
// },
// {
//   "id": "4",
//   "name": "Annie Copeland",
//   "number": "227-91-26",
//   "type": "mobile"
// }
