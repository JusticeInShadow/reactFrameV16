/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2017/12/26.
 */
import TYPE from '../constants/ActionConstant';

export const changeWords = (data) =>{
    return (dispatch) => {
        dispatch({
            type: TYPE.NEW_FRAME,
            data: data
        });
    }
}