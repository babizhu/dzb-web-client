import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Spin } from 'antd';

/**
 * 加载基础数据时，显示此页面
 */
class LoadingView extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return(<div style={{textAlign: 'center',Padding:'25%'}}><Spin   /></div>)
    }
}

function mapStateToProps(state, ownProps) {

    return {
        screen: state.screen

    }
}



export default connect(mapStateToProps)(LoadingView)