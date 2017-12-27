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

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.actions.changeWords("goodbye world！");
    }

    render() {
        return [
            <div key="title">FLEE</div>,
            <div key="word">{this.props.word}</div>,
            <div key="content">
                {this.props.children}
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
            changeWords:changeWords
        }, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(
    Main
);