/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2017/12/26.
 */
import {
    NEW_FRAME
} from '../constants/ActionConstant';

export const changeWords = (data) =>{
    return (dispatch) => {
        dispatch({
            type: NEW_FRAME,
            data: data
        });
    }
}