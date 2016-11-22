
/**
 * Created by liukun on 16/4/25.
 * 添加、修改集群数据
 */

import React, {Component, PropTypes} from 'react';
import {Button, Form, Input, Modal, Icon, Checkbox,Select} from 'antd';
const CheckboxGroup = Checkbox.Group;
const createForm = Form.create;
const FormItem = Form.Item;
import {OPERATION_ADD_ITEM, OPERATION_EDIT_ITEM} from '../../const/Const';
import {buildOptions,getKeyByValue} from '../../utils/selectBox';

class EnterpriseModal extends Component {

    constructor() {
        super();
        this.newItem = {};

    }

    onOk() {
        const {onOk,item,areaType } = this.props;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                //目前OPERATION_ADD_ITEM和OPERATION_EDIT_ITEM，本可合并成一个调用，考虑未来扩展性，暂时分开处理
                const currentItem = {...item,...values};
                console.log(values);
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

        const {visible, pending, item,areaType} = this.props;
        const {getFieldDecorator} = this.props.form;


        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14}
        };

        const title = this.formIsEdit(item) ? '编辑企业' : '添加企业';
        return (
            <Modal title={title} visible={visible}
                   style={{ top: 20 }}
                   confirmLoading={pending}
                   onOk={this.onOk.bind(this)}
                   onCancel={this.onCancle.bind(this)}>
                <Form horizontal>
                    <FormItem {...formItemLayout} label='企业名称：'>
                        {getFieldDecorator('name', {initialValue:item.name,rules: [{required: true, message: '企业名称不能为空!'}]})(
                            <Input placeholder="请输入企业名称"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='联系方式：'>
                        {getFieldDecorator('contact', {initialValue:item.contact,rules: [{required: false, message: '联系方式不能为空!'}]})(
                            <Input placeholder="请输入企业联系方式"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='关联企业：'>
                        {getFieldDecorator('linkName', {initialValue:item.linkName})(
                            <Input placeholder="请输入企业关联企业名称以获取产值产量"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='所属区域：'>
                        {getFieldDecorator('areaType',{initialValue:item.areaType?item.areaType+'':'0',rules: [{required: true}]})(
                            <Select placeholder="请输入企业所属区域" >
                                {buildOptions(areaType)}
                            </Select>
                        )}

                    </FormItem>
                    <FormItem {...formItemLayout} label='导航地址：'>
                        {getFieldDecorator('mapAddress', {initialValue:item.mapAddress,rules: [{required: false, message: '导航地址不能为空!'}]})(
                            <Input placeholder="请输入企业BAIDU地图导航地址"/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='地图坐标X：'>
                        {getFieldDecorator('mapX', {initialValue:item.mapX,rules: [{required: true, message: '在地图上的坐标X不能为空!'}]})(
                            <Input placeholder="请输入企业在地图上的坐标X"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='地图坐标Y：'>
                        {getFieldDecorator('mapY', {initialValue:item.mapY,rules: [{required: true, message: '在地图上的坐标Y不能为空!'}]})(
                            <Input placeholder="请输入企业在地图上的坐标Y"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='地  址：'>
                        {getFieldDecorator('address', {initialValue:item.address,rules: [{required: false, message: '地址不能为空!'}]})(
                            <Input placeholder="请输入企业地址"/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='介  绍：'>
                        {getFieldDecorator('description', {initialValue:item.description,rules: [{required: true, message: '介绍不能为空!'}]})(
                            <Input type="textarea" rows={4} placeholder="请输入企业介绍"/>
                        )}
                    </FormItem>

                </Form>
            </Modal>
        );
    }
}

EnterpriseModal.propTypes = {
    visible: PropTypes.bool.isRequired,//是否显示对话框
    pending: PropTypes.bool.isRequired,//
    onOk: PropTypes.func.isRequired,//点击关闭将调用此函数
    item: PropTypes.object.isRequired//当前处理的条目，如果是新增条目，则内容的id为-1
};
EnterpriseModal.defaultProps = {};

export default createForm()(EnterpriseModal);
