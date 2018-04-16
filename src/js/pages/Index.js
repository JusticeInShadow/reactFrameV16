/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2017/12/26.
 */
import React from 'react';
import {render} from 'react-dom';
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {combineReducers, createStore, applyMiddleware} from "redux";
import {reducer} from "../stores/Index";
import Immutable from "immutable";
import Main from "../view/Main";
import ChildOne from "../view/ChildOne";

const initialState = Immutable.Map();

let store = createStore(reducer, initialState, applyMiddleware(thunk));
console.log(store.getState());

render((
    <Provider store={store}>
        <Router>
            <Main>
                <Route exact path="/" component={ChildOne}/>
            </Main>
        </Router>
    </Provider>
), document.getElementById("wrap")
);