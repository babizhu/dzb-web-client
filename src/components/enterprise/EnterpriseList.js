/**
 * Created by liu_k on 2016/5/12.
 * 集群列表
 */
import React, {Component, PropTypes} from 'react';
import {Menu, Icon, Table, Dropdown, Button, Modal,Tooltip,message} from 'antd';
const DropdownButton = Dropdown.Button;
import SearchInput from '../Utils/SearchInput'
import { Input } from 'antd';
const Search = Input.Search;
import EnterpriseModal from './EnterpriseModal'
import DelEnterpriseModal from './DelEnterpriseModal'


import {ignoreClick} from '../../utils/index';
import {OPERATION_ADD_ITEM, OPERATION_DEL_ITEM, OPERATION_EDIT_ITEM} from '../../const/Const';


class EnterpriseList extends Component {
    constructor() {
        super();
        this.currentItem = {id: -1};
        this.state = {
            selectedRowKeys: [],
            keyword: ''
        }
    }

    //noinspection JSUnusedGlobalSymbols
    componentDidMount() {
        const {enterpriseList} = this.props.enterprise;
        const {queryEnterpriseList} = this.props;

        if (enterpriseList.data.length == 0)
            queryEnterpriseList();
    }

    //noinspection JSMethodCanBeStatic
    buildEmptyEnterprise() {
        return {id: -1};
    }

    //noinspection JSUnusedGlobalSymbols
    componentWillReceiveProps(nextProps) {

        //noinspection JSUnresolvedVariable
        const currentPending = this.props.enterprise.operationData.pending;
        const nextPending = nextProps.enterprise.operationData.pending;
        if (currentPending && !nextPending) {
            if (nextProps.enterprise.operationData.error === null) {
                message.success('操作成功。', 6);
            }
        }
    }

    /**
     * 如果item不为null，则此函数通过弹出窗口的onOk方法回调而来的
     * @param record        当前要修改的记录
     * @param newItem       当前要添加的记录，仅仅在此函数是通过新增记录的窗口的onOk方法回调而来的时候才会有值
     * @param operationId   当前操作的类型：
     *                      1       增加和修改记录
     *                      2       删除记录
     *
     */
    onOk(record, newItem, operationId) {
        const {openEnterpriseModal,doEnterpriseOperation} = this.props;
        if (newItem) {//如果是从弹出对话框通过点击OK按钮回调而来的情况
            doEnterpriseOperation( operationId, newItem);
        } else {
            if (record) {
                this.currentItem = record;
            }
            openEnterpriseModal(operationId);
        }
    }

    onDel(record,delItem) {
        const {openEnterpriseModal,doEnterpriseOperation} = this.props;
        if (delItem) {//如果是从弹出对话框通过点击OK按钮回调而来的情况
            doEnterpriseOperation( OPERATION_DEL_ITEM, delItem);
        } else {
            if (record) {
                this.currentItem = record;
            }
            openEnterpriseModal(OPERATION_DEL_ITEM);
        }
    }

    //
    // delEnterpriseOk(record, delItem) {
    //     const {operation} = this.props.enterprise;
    //     const {openEnterpriseModal} = this.props;
    //     if (delItem) {//从弹出窗口回调而来的
    //         operation(2, delItem);
    //     } else {
    //         if (record) {
    //             this.currentItem = record;
    //         }
    //         openEnterpriseModal(2);
    //     }
    // }
    search(keyword) {
        this.setState({keyword: keyword});
    }

    /**
     * 本地搜索集群列表
     */
    filterEnterpriseList() {

        const {data} = this.props.enterprise.enterpriseList;
        if (0 < this.state.keyword.length && data) {
            return data.filter((node)=>
                node.name.indexOf(this.state.keyword) != -1
                || node.description.indexOf(this.state.keyword) != -1
            );
        } else {
            return data;
        }
    }


    refresh() {
        const {queryEnterpriseList} = this.props;
        queryEnterpriseList();
    }

    render() {

        const menu = (
            <Menu>
                <Menu.Item key="1">上传EXCEL</Menu.Item>
            </Menu>
        );

        const {enterpriseList, operationData} = this.props.enterprise;
        const {areaType} = this.props.dataDictionary;
        const parent = this;
        //noinspection JSUnusedLocalSymbols
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                width: 200,
                key: 'name'
            }, {
                title: '联系方式',
                dataIndex: 'contact',
                width: 100,
                key: 'contact'
            }, {
                title: '关联企业',
                dataIndex: 'linkName',
                width: 80,
                key: 'linkName'
            }, {
                title: '所属区域',
                dataIndex: 'areaType',
                width: 100,
                key: 'areaType',
                render: (text)=> {
                    return areaType[text];
                }
            }, {
                title: '导航地址',
                dataIndex: 'mapAddress',
                width: 170,
                key: 'mapAddress',
                render: (text)=> {
                    return <a target="_blank" href={text}>{text}</a>
                }
            }, {
                title: '地图坐标',
                dataIndex: 'mapX',
                key: 'mapPoint',
                width: 170,
                render: (text,record)=> {
                    return text + " , " + record.mapY;
                }
            }, {
                title: '地址',
                dataIndex: 'address',
                width: 220,
                key: 'address'
            }, {
                title: '介绍',
                dataIndex: 'description',
                key: 'description'
            }, {
                title: '操作',
                key: 'operation',
                width: 95,
                render(text, record) {
                    return (
                        <div onClick={(e)=>ignoreClick(e)}>
                        <span className='table-actions'>
                            <Tooltip title="编辑">
                                <Button type="ghost" className='button'
                                        onClick={parent.onOk.bind(parent,record,null, OPERATION_EDIT_ITEM)}>
                                    <Icon type="edit"/>
                                </Button>
                            </Tooltip>
                            <Tooltip title="删除">
                                <Button type="ghost"
                                        className='button'
                                        onClick={parent.onDel.bind(parent,record,null)}>
                                    <Icon type="delete"/>
                                </Button>
                            </Tooltip>
                        </span>
                        </div>
                    );
                }
            }];

        // <SearchInput placeholder="search by name or description" onSearch={keyword => this.search(keyword)} style={{ width: '25%' }}/>
        // 自己做的搜索框，没问题电话，用系统提供的代替
        return (
            <div className='enterprise-list'>
                <div style={{margin:'10px 0px',height:'auto',minWidth:'560px'}}>


                    <Search placeholder="search by name or description" onSearch={keyword => this.search(keyword)} style={{ width: '25%' }}/>
                    <div style={{float:'right'}}>
                        <Button type="primary" icon="reload" onClick={this.refresh.bind(this)}
                                loading={enterpriseList.pending}
                                className='button'/>
                        <Button type="ghost" icon="plus" className='button'
                                onClick={this.onOk.bind(this,this.buildEmptyEnterprise(),null,OPERATION_ADD_ITEM)}>
                            添加</Button>

                        <DropdownButton overlay={menu} type="primary" style={{margin:'0px 6px'}}>
                            更多操作
                        </DropdownButton>
                    </div>

                </div>
                <div>
                    <Table
                        style={{}}
                        dataSource={this.filterEnterpriseList()}

                        // onRowClick={this.onRowClick.bind(this)}
                        pagination={false}

                        columns={columns}
                        loading={enterpriseList.pending}
                        size='middle'
                        rowKey={record=>record.id}/>

                </div>
                <EnterpriseModal visible={ operationData.currentOpenModal == 1 }
                                 onOk={this.onOk.bind(this)}
                                 pending={operationData.pending}
                                 item={this.currentItem}
                                 areaType={areaType}
                />

                <DelEnterpriseModal visible={ operationData.currentOpenModal == 2 }
                                 onOk={this.onOk.bind(this)}
                                 pending={operationData.pending}
                                 item={this.currentItem}
                />
            </div>

        )
    }
}
EnterpriseList.propTypes = {
    // enterpriseList: PropTypes.shape({
    //     pending: PropTypes.bool.isRequired,
    //     data: React.PropTypes.array.isRequired
    // }).isRequired,
    // operationData: PropTypes.shape({
    //     pending: PropTypes.bool.isRequired,//操作是否pending
    //     currentOpenModal: PropTypes.number//当前打开的对话框
    // }).isRequired,
    // /**
    //  * 根据当前路径从服务器端获取数据，有可能获取的是文件夹的数据，也有可能是具体某个文件的数据
    //  */
    // //getClustersListData: PropTypes.func.isRequired
    // operation: PropTypes.func.isRequired
};

EnterpriseList.defaultProps = {};
export default EnterpriseList;