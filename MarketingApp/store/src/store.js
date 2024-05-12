import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slice/UsersSlice';
import postsReducer from './slice/PostsSlice';
import counterReducer from './slice/CounterSlice';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { increment, clear } from './slice/CounterSlice';
import { updateUser, clearUser } from './slice/UsersSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    counter: counterReducer,
  },
})

export function useUserStore(){
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    return{
        user,
        updateUser: (user) => dispatch(updateUser(user)),
        clearUser: dispatch(clearUser()),
        
    }
}

export function useStore(){
    console.log(`usestore is getting called`);
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();
    return{
        count,
        increment: () => dispatch(increment()),
        clear: () => dispatch(clear()),
        
    }
}

export function StoreProvider({children}){
    return <Provider store={store}>{children}</Provider>
}
