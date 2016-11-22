/**
 * Created by liukun on 2016-11-09 11:37:54.
 * 添加、修改数据
 */

import React, {Component, PropTypes} from 'react';
import {Button, Form, Input, Modal, Icon, Checkbox} from 'antd';
const CheckboxGroup = Checkbox.Group;
const createForm = Form.create;
const FormItem = Form.Item;
import {OPERATION_ADD_ITEM, OPERATION_EDIT_ITEM} from '../../const/Const';

class UserModal extends Component {

    constructor() {
        super();
        this.newItem = {};
    }

    onOk() {
        const {onOk,item } = this.props;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                //目前OPERATION_ADD_ITEM和OPERATION_EDIT_ITEM，本可合并成一个调用，考虑未来扩展性，暂时分开处理
                const currentItem = {...item,...values};
                if( item.id == -1 ){
                    onOk(null, currentItem, OPERATION_ADD_ITEM);
                }else{
                    onOk(null, currentItem, OPERATION_EDIT_ITEM);
                }
            }
        });

    }

    onCancle() {
        const {onOk} = this.props;
        onOk();
    }

    /**
     * 初始化form的内容，目前看当操作成功后，保留上次的操作内容很没有必要，干脆屏蔽，但不删除，存档
     */
    componentWillReceiveProps(nextProps) {
        const {visible, item, form} = this.props;

        if (visible && !nextProps.visible) {//对话框由可见变为不可见
            form.resetFields();
        }
    }


    /**
     * 当前对话框是用于新增（false）或者是修改(true)信息
     *
     */
    formIsEdit(item) {
        return item.id !== -1;
    }

    render() {

        const {visible, pending, item} = this.props;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14}
        };


        const title = this.formIsEdit(item) ? '编辑User' : '添加User';
        return (
            <Modal title={title} visible={visible}
                   confirmLoading={pending}
                   onOk={this.onOk.bind(this)}
                   onCancel={this.onCancle.bind(this)}>
                <Form horizontal>
                    <FormItem {...formItemLayout} label='名称：'>
                        {getFieldDecorator('name', {initialValue:item.name,rules: [{required: true, message: '名称不能为空!'}]})(
                            <Input placeholder="请输入名称"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='密码：'>
                        {getFieldDecorator('password', {initialValue:item.password,rules: [{required: true, message: '密码不能为空!'}]})(
                            <Input placeholder="请输入密码"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='是否锁定：'>
                        {getFieldDecorator('locked', {initialValue:item.locked,rules: [{required: false}]})(
                            <Input placeholder="请输入"/>
                        )}
                    </FormItem>


                </Form>
            </Modal>
        );
    }
}

UserModal.propTypes = {
    visible: PropTypes.bool.isRequired,//是否显示对话框
    pending: PropTypes.bool.isRequired,//
    onOk: PropTypes.func.isRequired,//点击关闭将调用此函数
    item: PropTypes.object.isRequired//当前处理的条目，如果是新增条目，则内容的id为-1
};
UserModal.defaultProps = {};

export default createForm()(UserModal);
