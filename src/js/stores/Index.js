/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2017/12/26.
 */
import {combineReducers} from 'redux-immutable';
import {NEW_FRAME} from "../constants/ActionConstant";


const common = (state, action) => {
    state = state || {
        word:"hello world!"
    };
    if(action.type == NEW_FRAME){
        return Object.assign({}, state, {word: action.data});
    }
    return state
};

export let reducer = combineReducers({
    common: common,
});