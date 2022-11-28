import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, deleteContact } from './operations';

const extraActions = [fetchContacts, addContacts, deleteContact];

const getActions = type => isAnyOf(...extraActions.map(action => action[type]));

const fetchContactsSuccessReducer = (state, action) => {
  state.items = action.payload;
};
const addContactSuccessReducer = (state, action) => {
  state.items.push(action.payload);
};

const deleteContactSuccessReducer = (state, action) => {
  const index = state.items.findIndex(contact => contact.id === action.payload);
  state.items.splice(index, 1);
};

const pendingReducer = state => {
  state.isLoading = true;
};

const rejectedReducer = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const fulfilledReducer = state => {
  state.isLoading = false;
  state.error = null;
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, fetchContactsSuccessReducer)
      .addCase(addContacts.fulfilled, addContactSuccessReducer)
      .addCase(deleteContact.fulfilled, deleteContactSuccessReducer)
      .addMatcher(getActions('pending'), pendingReducer)
      .addMatcher(getActions('rejected'), rejectedReducer)
      .addMatcher(getActions('fulfilled'), fulfilledReducer),
  // {
  //   [fetchContacts.pending]: handlePending,
  //   [fetchContacts.fulfilled](state, action) {
  //     state.isLoading = false;
  //     state.error = null;
  //     state.items = action.payload;
  //   },
  //   [fetchContacts.rejected]: handleRejected,
  //   [addContacts.pending]: handlePending,
  //   [addContacts.fulfilled](state, action) {
  //     console.log('state', state);
  //     state.isLoading = false;
  //     state.error = null;
  //     state.items.push(action.payload);
  //   },
  //   [addContacts.rejected]: handleRejected,
  //   [deleteContact.pending]: handlePending,
  //   [deleteContact.fulfilled](state, action) {
  //     state.isLoading = false;
  //     state.error = null;
  //     const index = state.items.findIndex(
  //       contact => contact.id === action.payload.id
  //     );
  //     state.items.splice(index, 1);
  //   },
  //   [deleteContact.rejected]: handleRejected,
  // },
});

export const contactReducer = contactSlice.reducer;
