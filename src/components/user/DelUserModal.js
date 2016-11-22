/**
 * Created by liukun on 2016-11-09 11:37:53.
 * 删除User
 */

import React, {Component, PropTypes} from 'react';
import ReactDom from "react-dom"
import {Button, Form, Input, Modal, Icon, Switch} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
import {OPERATION_DEL_ITEM} from '../../const/Const';

class DelUserModal extends Component {

    onOk() {
        const {onOk, item} = this.props;

        onOk(null, item, OPERATION_DEL_ITEM);


    }

    onCancle() {
        const {onOk} = this.props;
        onOk();
    }

    formatText(item) {
        return <span style={{lineHeight:'25px'}}>
            <div>名称 : {item.name}</div>

        </span>
    }

    render() {
        const {visible, pending, item} = this.props;
        return (
            <Modal visible={visible}
                   confirmLoading={pending}
                   closable={false}
                   width={420}
                   onOk={this.onOk.bind(this)}
                   onCancel={this.onCancle.bind(this)}
            >
                <div className={'ant-confirm-body'} style={{   margin:'15px', color: '#fa0'}}>
                    <Icon className={'anticon'} type='question-circle'/>
                    <span className={'ant-confirm-title'}>确认要删除吗?</span>
                    <div className={'ant-confirm-content'}>{this.formatText(item)}</div>
                </div>
            </Modal>
        );
    }
}

DelUserModal.propTypes = {
    visible: PropTypes.bool.isRequired,//是否显示对话框
    pending: PropTypes.bool.isRequired,//
    onOk: PropTypes.func.isRequired,//点击关闭将调用此函数
    item: PropTypes.object.isRequired//当前删除的条目
};


export default DelUserModal;
