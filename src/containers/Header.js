/**
 * Created by liu_k on 2015/11/18.
 * 整个应用的header条
 */
import React, { Component } from 'react';
import ReactDom from "react-dom"
import { Steps,Menu, Dropdown, Button, Icon } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';


import '../css/header.scss'

import * as profileActions from '../actions/Profile'
import * as sideBarActions from '../actions/SideBar'
class Header extends Component {

    subMenuClick() {


        //ReactDom.findDOMNode(this.refs.deleteBtn).style.display
        //noinspection JSUnresolvedVariable
        const el1 = ReactDom.findDOMNode(this.refs.headerMiddle);
        //noinspection JSUnresolvedVariable
        const el2 = ReactDom.findDOMNode(this.refs.headerRight);
        const els = [el1, el2];

        els.forEach(x=> {
            if (x.className.indexOf(" in") > 0) {
                x.className = x.className.substr(0, x.className.length - 3);
            } else {
                x.className += " in";
            }
        });
    }

    render() {

        const menu = <div style={{width:'100%'}}><Menu >

            <Menu.Item>
                <span><img src='/img/gb.png' alt=''/> English</span>
            </Menu.Item>
            <Menu.Item>
                <span><img src='/img/gb.png' alt='' style={{paddingTop:'1px'}}/> English</span>
            </Menu.Item>
            <Menu.Item>
                <span><img src='/img/gb.png' alt='' style={{paddingTop:'1px'}}/> 中 国</span>
            </Menu.Item>

        </Menu></div>;
        const menu1 = <div ><Menu >

            <Menu.Item>
                <Icon type="aliwangwang"/><span> 我的资料</span>
            </Menu.Item>
            <Menu.Item>
                <Icon type="plus-circle"/><span> 我的朋友</span>
            </Menu.Item>
            <Menu.Divider className="menu-divider"/>
            <Menu.Item>
                <Icon type="minus-circle"/><span> <a href='http://www.sina.com'>退出系统</a></span>
            </Menu.Item>

        </Menu></div>;
        const {profile} = this.props;
        const {changeShowMode} = this.props.sideBarActions;

        return (


            <div className='header'>
                <div className='brand'>
                    <ul>
                        <li className='left-icon'>
                            <a href='/'>
                                <img src='/img/logo_light.png' alt=''/>
                            </a>
                        </li>
                        <li className='mobile-icon' onClick={this.subMenuClick.bind(this)}>
                            <Icon type="appstore" className='icon'/>
                        </li>
                        <li className='mobile-icon' onClick={changeShowMode}>
                            <Icon type="bars" className='icon'/>
                        </li>
                    </ul>
                </div>

                <div className='header-middle' ref="headerMiddle">
                    <ul>
                        <li onClick={changeShowMode}><Icon type="bars" className='icon'/></li>
                        <li>
                            <Icon type="github" className='icon'/>
                            <span className="visible-xs-inline-block">Git updates</span>

                        </li>
                        <li>Label</li>
                    </ul>
                </div>

                <div className='header-right' ref="headerRight">
                    <ul>


                        <Dropdown overlay={menu}>
                            <li className='lang'>
                            <span>
                                <img src='/img/gb.png' alt='' style={{paddingTop:'1px'}}/>
                                English <Icon type="down" className="downIcon"/>
                            </span>
                            </li>
                        </Dropdown>
                        <li className='msg'>
                            <Icon type="aliwangwang-o" className='header-icon'/>
                            <span className="visible-xs-inline-block">短 信</span>

                        </li>
                        <Dropdown overlay={menu1}>
                            <li className='person'>
                            <span>
                                <img src={profile.iconUrl} alt=''/>
                                <span>{profile.name} <Icon type="down" className="downIcon"/></span>
                            </span>
                            </li>
                        </Dropdown>
                    </ul>
                </div>
            </div>


        );
    }
}


Header.propTypes = {

};
Header.defaultProps = {};
function mapStateToProps(state) {
    return {
        profile: state.profile
    }
}

function mapDispatchToProps() {
    return dispatch => ({
        profileActions: bindActionCreators(profileActions, dispatch),
        sideBarActions: bindActionCreators(sideBarActions, dispatch)
    });

}
export default connect(mapStateToProps, mapDispatchToProps)(Header)



