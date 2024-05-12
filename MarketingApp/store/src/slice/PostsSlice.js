import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    deletePost: (state, action) => {
      return state.filter(post => post.id !== action.payload.id);
    }
  }
});

export const { addPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
