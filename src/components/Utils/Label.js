/**
 * Created by liu_k on 2015/11/27.
 * labe控件,用于显示一些带颜色背景的文字
 */

import React, { Component } from 'react';
import './../../css/utils/label.scss';


class Label extends Component {
  render() {
      //const dot = this.props.text;
      let style = 'label ';
      style += this.props.isSuccess? 'success' : 'failure';
    return (
        <span className={style}>{this.props.text}</span>
    );
  }
}

Label.propTypes = {};
Label.defaultProps = {isSuccess:true};

export default Label;
