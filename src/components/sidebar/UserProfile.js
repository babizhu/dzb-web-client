/**
 * Created by liu_k on 2016/3/31.
 * 侧边栏的用户信息部分
 */
import React, { Component,PropTypes } from 'react';
import ReactDom from "react-dom";
import { Steps,Menu, Dropdown, Button, Icon } from 'antd';
import {MINI,NORMAL} from '../../actions/SideBar'
//changeShowMode

export default class UserProfile extends Component {


    render() {
        //const {menuData, ...others} = this.props;
        let { profile,sideBar} = this.props;

        //let user = this.props.userData;
        //let iconMode = this.props.iconMode;//是否仅显示图标模式
        let mediaStyle = {
            padding: '20px'
        };

        let mediaLeftStyle = {
            paddingRight: '10px'
        };

        let mediaShow = {
            display: 'table-cell'
        };

        if (sideBar.showMode === MINI) {
            mediaStyle = {
                padding: '23px 10px'
            };
            mediaLeftStyle = {
                paddingRight: '0px'
            };
            mediaShow = {
                display: 'none'
            }
        }
        return (
            <div>
                <div className="category-content">
                    <div className="media" style={mediaStyle}>
                        <div className="media-left" style={mediaLeftStyle}>
                            <img src={profile.iconUrl} className="img-circle img-sm" alt=""/>
                        </div>

                        <div className="media-body" ref='mediaBody' style={mediaShow}>
                            <span>{profile.name}</span>

                            <div className="text-size-mini">
                                <Icon type="environment-o"/> &nbsp;{profile.address}
                            </div>
                        </div>

                        <div className="media-right" ref='mediaRight' style={mediaShow}>
                            <Icon type="setting"/>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}


UserProfile.propTypes = {
    profile: PropTypes.shape({
        name: PropTypes.string.isRequired,
        iconUrl: PropTypes.string,
        address: PropTypes.string
    }).isRequired
};
UserProfile.defaultProps = {};

