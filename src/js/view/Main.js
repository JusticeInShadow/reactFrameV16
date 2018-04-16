/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2017/12/26.
 */
import React, {findDOMNode, Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeWords} from "../actions/Main";
import {Spin} from "antd";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false
        }
    }

    async componentDidMount(){
        const sleep = (timeout)=>{
            return new Promise( (resolve, reject)=>{
                setTimeout(resolve, timeout)
            })
        };
        this.setState({
            loading:true
        });
        console.time("async");
        await sleep(3000);
        console.timeEnd("async");
        this.setState({
            loading:false
        });
        this.props.actions.changeWords("goodbye world！");
    }

    render() {
        return [
            <div key="title">FLEE</div>,
            <div key="word">{this.props.word}</div>,
            <div key="content">
                <Spin spinning={this.state.loading}>
                {this.props.children}
                </Spin>
            </div>,
            <div key="test">
                随便写点什么，看看会不会热更新！failed？帅，帅，帅！！！！现在就要自由，怎一帅字了得
            </div>
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
            changeWords
        }, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(
    Main
);