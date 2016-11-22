/**
 * Created by liu_k on 2016/4/18.
 */
import React, { Component, PropTypes } from 'react'
import QueueAnim from 'rc-queue-anim';

export  const AnimEnhance = (ComposedComponent) => class extends Component {
    //constructor() {
    //    this.state = { data: null };
    //}
    //componentDidMount() {
    //    this.setState({ data: 'Hello' });
    //}
    render() {
        return (
            <QueueAnim
                animConfig={[
            { opacity: [1, 0], translateX: [0, 100] },
            { opacity: [1, 0], translateX: [0, -100] }
          ]}
                       >

                <div key='c'>
                    <ComposedComponent {...this.props} />
                </div>
            </QueueAnim>
        );

    }
}