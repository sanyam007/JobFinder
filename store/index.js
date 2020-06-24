import {createStore, compose, applyMiddleware} from 'redux';
import React, {Component} from 'react';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
 import {AsyncStorage} from 'react-native'
import reducers from '../reducer'


const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: "likedJobs"
};
const persistReducer = persistCombineReducers(persistConfig, reducers);


const store = createStore(
    persistReducer,
    {},
    compose(
    applyMiddleware(thunk)
    )
    );




    persistStore(
        store,
        null,
        () => {store.getState()}
    )

export default store;