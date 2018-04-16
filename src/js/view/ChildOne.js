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
import axios from "axios";

class Main extends Component {
    constructor(props) {
        super(props);
    }

    //实现文件下载
    download(){
        // axios.get("/download");
        window.open("http://127.0.0.1:6001/download");
    }

    render() {
        return [
            <div key="title" style={{height:300,background:"#dedede",width:1336,margin:"0 auto"}}>CHILD</div>,
            <div key="word" onClick={()=>this.download()}>I'm the first child!</div>
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