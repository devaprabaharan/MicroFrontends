import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user:{}
  },
  reducers: {
    updateUser: (state, action) => {
      return state.user = action.payload;
    },
    clearUser:(state, action) => {
        return state.user = {};
    }
  }
});

export const { updateUser, clearUser } = usersSlice.actions;
export default usersSlice.reducer;
