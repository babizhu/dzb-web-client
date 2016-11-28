import React, {Component, PropTypes} from 'react'
import {Form, Input, Button, Checkbox, Tooltip, Icon, Row, Col, notification} from 'antd'
import {connect} from 'react-redux'

// import {login} from '../actions/Profile'
import * as profileActions from '../actions/Profile'
import '../css/login.scss'
import JSEncrypt from '../utils/jsencrypt'
import {PUBLIC_KEY} from '../const/Key'
const FormItem = Form.Item;


const contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

class Login extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {

        let exdate = new Date();
        exdate.setDate(exdate.getDate() + 1);
        document.cookie = "isLogin=" + nextProps.profile.isLogin;// + ";expires="+exdate.toGMTString();
        if (nextProps.profile.isLogin === true) {
            // console.log(this);
            const redirectPath = this.props.redirectPath;
            this.context.router.replace(redirectPath ? redirectPath : '/');
            // this.props.history.replace('/app');
        }
    }

    // handleCount() {
    //     // this.context.router.replace('/');
    //     // console.log("handlerCount")
    //     // console.log(this.props);
    //
    //     this.props.count();
    // }

    handleSubmit(e) {
        e.preventDefault();
        // const data = this.props.form.getFieldsValue();
        // this.props.login(data.user, data.password, true);
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let encrypt = new JSEncrypt();
            // encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpkUP/2WQ4wb5L6DxTf00dEsWR3zcamXsA7x+cpFYMMwxQpECpKe9ZTnI1hLz7qHakKyI8EwakRCaWCbQfGs+FZ0Q8WwUohEH/A/s8cHLpC/XUh3CGvBSVm8UHKlHSn5yGkPwfU+sdwFLNSpq78UCcYXzApmVAgKTKblf4ryY+swIDAQAB');
            encrypt.setPublicKey(PUBLIC_KEY);
            const password = encrypt.encrypt(values.password);

            // console.log('rsa password : ', password);
            this.props.login(values.userName, password, values.rememberMe);
        });
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        // const formItemLayout = {
        //     labelCol: {span: 6},
        //     wrapperCol: {span: 14}
        // };
        // const user = getFieldProps('user', {
        //     initialValue: 'admin',
        //     rules: [{
        //         required: true,
        //         whitespace: true,
        //         message: '请输入用户名'
        //     }]
        // });
        //
        // const password = getFieldProps('password', {
        //     initialValue: '123456',
        //     rules: [{
        //         required: true,
        //         whitespace: true,
        //         message: '请输入密码'
        //     }]
        // });
        const title = <span>登录信息保存1天。 <br /><br />公共网络请勿使用此选项</span>;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14}
        };
        return (
            <span className="login">
            <Row className="login-row" type="flex" justify="space-around" align="middle">
                <Col span="8">
                    <Form horizontal onSubmit={this.handleSubmit.bind(this)} className="login-form">

                        <FormItem {...formItemLayout} label='用户名：'>
                            {getFieldDecorator('userName', {
                                initialValue: 'admin',
                                rules: [{required: true, message: 'Please input your username!'}]
                            })(
                                <Input addonBefore={<Icon type="user" />} placeholder="请输入登录用户名"/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label='密码：'>
                            {getFieldDecorator('password', {
                                initialValue: '123456',
                                rules: [{required: true, message: 'Please input your Password!'}]
                            })(
                                <Input addonBefore={<Icon type="lock" />} type="password" placeholder="请输入登录密码"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={<span>记住我 <Tooltip title={title}><Icon type="question-circle-o" /></Tooltip></span>}
                        >

                            {getFieldDecorator('rememberMe', {valuePropName: 'checked', initialValue: false})(
                                <Checkbox>同意</Checkbox>
                            )}
                        </FormItem>
                        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                          <Button type="primary" htmlType="submit">确定</Button>

                        </FormItem>


                    </Form>
                </Col>
            </Row>
            </span>

        )
    }
}

// Login.contextTypes = contextTypes;
//
// Login.propTypes = propTypes;
//
Login.contextTypes = contextTypes;
Login = Form.create()(Login);

// export default connect(mapStateToProps, mapDispatchToProps)(Login)
function mapStateToProps(state, ownProps) {
    return {
        profile: state.profile,
        redirectPath: ownProps.location.query.redirectPath//登录成功后跳转的页面

    }
}

export default connect(mapStateToProps, profileActions)(Login);
