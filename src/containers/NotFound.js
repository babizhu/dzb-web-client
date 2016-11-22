import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'

import {AnimEnhance} from './AnimEnhance'

class NotFound extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{background:'red'}}>
                <h1>文件没找到</h1>
                <Link to={`/`}>
                    返回主页
                </Link>
            </div>
        )
    }

}
export default AnimEnhance(NotFound);