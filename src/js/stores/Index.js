/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2017/12/26.
 */
import {combineReducers} from 'redux-immutable';
import TYPE from "../constants/ActionConstant";


const common = (state, action) => {
    state = state || {
        word:"hello world!"
    };
    switch(action.type){
        case TYPE.NEW_FRAME:
            return {...state,word:action.data};
            break;
        default:
            return state;
            break;
    }
};

export let reducer = combineReducers({
    common,
});