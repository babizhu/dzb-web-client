/**
 * Created by liu_k on 2016/3/31.


 * 整个应用的header条中的下拉菜单
 */
import React, { Component } from 'react';
import ReactDom from "react-dom"

import '../../css/components/header/dropDownMenu.scss'

export default class DropDownMenu extends Component {

    //getInitialState() {
    //    return {
    //
    //        visible: false,
    //    };
    //}


    click() {
        this.setState({visible: false});
    }

    render() {

        let s = {
            marginTop: '12px',
            /* margin-left: 50px; */
            width: '200px',
            position: 'absolute',
            background: 'red',
            //height:'300px'
        }
        return (
            <div>
                <div onClick={this.click.bind(this)}>{this.props.title}</div>
                <div style={s}>{this.props.menu}</div>
            </div>
        )
    }
}


DropDownMenu.propTypes = {};
DropDownMenu.defaultProps = {};

