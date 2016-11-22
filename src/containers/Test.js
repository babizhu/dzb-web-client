/**
 * Created by liu_k on 2016/4/8.
 * 用于测试的目的
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import JSEncrypt from '../utils/jsencrypt'

import * as profileActions from '../actions/Profile'

class Test extends Component {


    render() {

        let encrypt = new JSEncrypt();
        encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpkUP/2WQ4wb5L6DxTf00dEsWR3zcamXsA7x+cpFYMMwxQpECpKe9ZTnI1hLz7qHakKyI8EwakRCaWCbQfGs+FZ0Q8WwUohEH/A/s8cHLpC/XUh3CGvBSVm8UHKlHSn5yGkPwfU+sdwFLNSpq78UCcYXzApmVAgKTKblf4ryY+swIDAQAB');
        const result = encrypt.encrypt('abcdef');
        
        console.log( result );
        
        // var encrypted = encrypt.encrypt("123");
        // JSEncrypt.setPublicKey
        // JSEncrypt.setPublicKey("aaaaaa");
        // const encrypted = JSEncrypt.encrypt("123");
        // console.log(encrypted);
        // encrypt.setPublicKey($('#pubkey').val());
        // var encrypted = encrypt.encrypt($('#input').val());

        return (
            <div>
                abd

            </div>


        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile

    }
}
//function mapDispatchToProps() {
//    return dispatch => ({
//        fileExplorerActions: bindActionCreators(fileExplorerActions, dispatch),
//        appActions: bindActionCreators(appActions, dispatch)
//    });
//
//}

//export default connect(mapStateToProps, mapDispatchToProps)(AnimEnhance(HadoopFile));
export default connect(mapStateToProps, profileActions)(Test);

