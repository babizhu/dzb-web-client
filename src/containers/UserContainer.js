/**
 * Created by liulaoye on 2016-11-11 15:01:04.
 * User管理容器
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
//import {notification, Spin} from 'antd'
import {AnimEnhance} from './AnimEnhance'

import UserList from '../components/user/UserList'
import * as userActions from '../actions/User';
import '../css/user.scss'
class UserContainer extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div className='user'>

                <UserList {...this.props}/>
            </div>
        )
    }
}

UserContainer.propTypes = {

};

function mapStateToProps(state, ownProps) {

    return {
        user: state.user
    }
}



export default connect(mapStateToProps, userActions)(AnimEnhance(UserContainer));
