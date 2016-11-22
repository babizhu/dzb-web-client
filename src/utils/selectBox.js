/**
 * Created by liulaoye on 16-11-10.
 * select 选择框的相关操作
 */
import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

// import {Button, Form, Input, Modal, Icon, Checkbox,Select} from 'antd';
//
// export function getValue(key,data) {
//     return data[key];
// }

/**
 * 根据数据字典生成下拉选择框的option的数据选项
 */
export function buildOptions( data ){
    
    const options = [];
    for( let name in data){
        options.push(<Option key={name}>{data[name]}</Option>);
    }
    return options;
}

/**
 * 根据数据字典生成下拉选择框的option的数据选项
 */
export function getKeyByValue( data,value ){

    
    for( let name in data){
        if( data[name] === value ){
            return name;
        }
        
    }
    return null;
}