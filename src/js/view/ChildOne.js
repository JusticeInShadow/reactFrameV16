/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2017/12/27.
 */

import React, {findDOMNode, Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return [
            <div key="title">CHILD</div>,
            <div key="word">I'm the first child!</div>
        ]
    }
}

const mapStateToProps = (state) => {
    let common = state.get("common");
    return {
        word:common.word,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({

        }, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(
    Main
);