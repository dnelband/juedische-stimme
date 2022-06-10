import { useState, useEffect, useReducer, createContext } from "react";
import { user } from "./reducers/user";
import { posts } from "./reducers/posts";
import { mediaItems } from "./reducers/mediaItems";
import { comments } from "./reducers/comments";
import { facebook } from "./reducers/facebook";
import { galleries } from "./reducers/galleries";
import { categories } from "./reducers/categories";

// initial state
const initialState = {
  user: null,
  posts: [],
  mediaItems:[],
  comments:[],
  facebook:{},
  galleries:[],
  categories:[]
};

// create context
const Context = createContext({});

// combine reducer function
const combineReducers = (...reducers) => (state, action) => {
  for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
  return state;
};

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(combineReducers(user,posts,mediaItems,comments,facebook,galleries,categories), initialState); // pass more reducers combineReducers(user, blogs, products)
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };

/* ADDING A NEW REDUCER */
// create reducers/myreducer.js
// import { myreducer } from './reducers/myreducer.js
// add myreducer property to initialState
// add myreducer to combineReducers in Provider