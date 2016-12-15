/**
 * Created by liukun on 2016-11-09 11:37:54.
 * 添加、修改数据
 */

import React, {Component, PropTypes} from 'react';
import {Button, Form, Input, Modal, Icon, Checkbox, Tabs, Row, Col} from 'antd';
const CheckboxGroup = Checkbox.Group;
const createForm = Form.create;
const FormItem = Form.Item;
import {OPERATION_ADD_ITEM, OPERATION_EDIT_ITEM,OPERATION_CHANGE_PASSWORD} from '../../const/Const';
const TabPane = Tabs.TabPane
class UserModal extends Component {

    constructor() {
        super();
        this.newItem = {};
    }

    resetPassword() {

        const {onOk, item} = this.props;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                //目前OPERATION_ADD_ITEM和OPERATION_EDIT_ITEM，本可合并成一个调用，考虑未来扩展性，暂时分开处理
                const currentItem = {...item, ...values};
                onOk(null, currentItem, OPERATION_CHANGE_PASSWORD);
            }
        });
    }

    onOk() {
        const {onOk, item} = this.props;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                //目前OPERATION_ADD_ITEM和OPERATION_EDIT_ITEM，本可合并成一个调用，考虑未来扩展性，暂时分开处理
                const currentItem = {...item, ...values};
                if (item.id == -1) {
                    onOk(null, currentItem, OPERATION_ADD_ITEM);
                } else {
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

    checkConfirmPassword(rule, value, callback) {
        const form = this.props.form;
        if (value) {
            form.validateFields(['confirmPassword'], {force: true});
        }
        callback();
    }

    checkPassowrd(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('请确保输入的两次密码相等!');
        } else {
            callback();
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
            <Modal title="" visible={visible}
                   confirmLoading={pending}
                   onOk={this.onOk.bind(this)}
                   footer={[]}
                   onCancel={this.onCancle.bind(this)}>
                <Tabs defaultActiveKey="1" tabPosition="top">
                    <TabPane tab="编辑用户" key="1">
                        <Form horizontal>
                            <FormItem {...formItemLayout} label='名称：'>
                                {getFieldDecorator('name', {
                                    initialValue: item.name,
                                    rules: [{required: true, message: '名称不能为空!'}]
                                })(
                                    <Input placeholder="请输入名称"/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout} label='是否锁定：'>
                                {getFieldDecorator('locked', {initialValue: item.locked, rules: [{required: false}]})(
                                    <Input placeholder="请输入"/>
                                )}
                            </FormItem>

                            <Row>
                                <Col span={20} style={{ textAlign: 'right' }}>
                                    <Button size="large">取 消</Button>
                                    <Button style={{ marginLeft: 8 }} type="primary" size="large">确 定</Button>
                                </Col>
                            </Row>
                        </Form>
                    </TabPane>
                    <TabPane tab="修改密码" key="2"><Form horizontal>
                        <FormItem {...formItemLayout} label='输入新密码：'>
                            {getFieldDecorator('newPassword',
                                {
                                    rules: [{required: true, message: '密码不能为空!'},
                                        {
                                            validator: this.checkConfirmPassword.bind(this)
                                        }
                                    ]
                                })(
                                <Input placeholder="请输入新密码"/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label='再次输入密码：'>
                            {getFieldDecorator('confirmPassword', {
                                rules: [
                                    {required: true, message: '密码不能为空!'},
                                    {
                                        validator: this.checkPassowrd.bind(this)
                                    }

                                ]
                            })(
                                <Input placeholder="请再次输入新密码"/>
                            )}
                        </FormItem>

                        <Row>
                            <Col span={20} style={{ textAlign: 'right' }}>
                                <Button size="large">取 消</Button>
                                <Button style={{ marginLeft: 8 }} type="primary" size="large"
                                        onClick={this.resetPassword.bind(this)}>确 定</Button>
                            </Col>
                        </Row>


                    </Form></TabPane>
                </Tabs>

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
