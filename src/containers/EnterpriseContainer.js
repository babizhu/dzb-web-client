/**
 * 企业管理容器
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {notification, Spin} from 'antd'
import {AnimEnhance} from './AnimEnhance'

import EnterpriseList from '../components/enterprise/EnterpriseList'
import * as enterpriseActions from '../actions/Enterprise';
import '../css/enterprise.scss'
class EnterpriseContainer extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div className='enterprise'>

                <EnterpriseList {...this.props}/>
            </div>
        )
    }
}

EnterpriseContainer.propTypes = {

};

function mapStateToProps(state, ownProps) {

    return {
        enterprise: state.enterprise,
        dataDictionary:state.dataDictionary
    }
}



export default connect(mapStateToProps, enterpriseActions)(AnimEnhance(EnterpriseContainer));
