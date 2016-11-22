/**
 * Created by liu_k on 2015/11/27.
 * labe控件,用于显示一些带颜色背景的文字
 */

import React, { Component } from 'react';
import './../../css/utils/label.scss';


class Label1 extends Component {
    render() {
        //const dot = this.props.text;
        let style = 'label ';
        style += this.props.isSuccess ? 'success' : 'failure';
        return (
            
                <div onClick={this.handleCount.bind(this)}>bbbbbbbbbbbbbbbbbbbb</div>
        );
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceivePropscomponentWillReceivePropscomponentWillReceiveProps")

    }

    handleCount() {
        // this.context.router.replace('/');
        // console.log("handlerCount")
        // console.log(this.props);

        // alert(3)
        this.props.count();
        this.setState({a:1});
    }
}

Label1.propTypes = {};
Label1.defaultProps = {isSuccess:true};

export default Label1;
