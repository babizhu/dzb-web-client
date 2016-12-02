/**
 * Created by liu_k on 2016/4/8.
 * 用于测试的目的
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd';

import * as profileActions from '../actions/Profile'

class Test extends Component {

    click(){
        console.log(1111111111);
        this.props.count();
    }

    render() {


        return (
            <div>
                <Button type="dashed" onClick={this.click.bind(this)} >测试</Button>

            </div>


        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile

    };
}

export default connect(mapStateToProps, profileActions)(Test);

