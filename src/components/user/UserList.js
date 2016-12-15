/**
 * Created by liu_k on 2016-11-09 11:37:54.
 * User列表
 */
import React, {Component, PropTypes} from 'react';
import {Menu, Icon, Table, Dropdown, Button, Modal,Tooltip,message} from 'antd';
const DropdownButton = Dropdown.Button;
import SearchInput from '../Utils/SearchInput'
import UserModal from './UserModal'
import DelUserModal from './DelUserModal'


import {ignoreClick} from '../../utils/index';
import {OPERATION_ADD_ITEM, OPERATION_DEL_ITEM, OPERATION_EDIT_ITEM,OPERATION_CHANGE_PASSWORD} from '../../const/Const';


class UserList extends Component {
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
        const {userList} = this.props.user;
        const {queryUserList} = this.props;

        if (userList.data.length == 0)
            queryUserList();
    }

    //noinspection JSMethodCanBeStatic
    buildEmptyUser() {
        return {id: -1};
    }

    //noinspection JSUnusedGlobalSymbols
    componentWillReceiveProps(nextProps) {

        //noinspection JSUnresolvedVariable
        const currentPending = this.props.user.operationData.pending;
        const nextPending = nextProps.user.operationData.pending;
        if (currentPending && !nextPending) {
            if (nextProps.user.operationData.error === null) {
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
     *                      3       重置密码
     *
     */
    onOk(record, newItem, operationId) {
        const {openUserModal,doUserOperation,resetPassword} = this.props;
        if (newItem) {//如果是从弹出对话框通过点击OK按钮回调而来的情况
            if( operationId === OPERATION_CHANGE_PASSWORD ){
                console.log(newItem.newPassword);
                resetPassword(newItem.name,newItem.newPassword);
            }else{
                doUserOperation( operationId, newItem);
            }
        } else {
            if (record) {
                this.currentItem = record;
            }
            openUserModal(operationId);
        }
    }
    // onChangePassword(record,userItem) {
    //     const {openUserModal,doUserOperation} = this.props;
    //     if (userItem) {//从弹出对话框通过点击OK按钮回调而来的情况
    //         doUserOperation( OPERATION_CHANGE_PASSWORD, userItem);
    //     } else {
    //         if (record) {
    //             this.currentItem = record;
    //         }
    //         openUserModal(OPERATION_CHANGE_PASSWORD);
    //     }
    // }
    onDel(record,delItem) {
        const {openUserModal,doUserOperation} = this.props;
        if (delItem) {//如果是从弹出对话框通过点击OK按钮回调而来的情况
            doUserOperation( OPERATION_DEL_ITEM, delItem);
        } else {
            if (record) {
                this.currentItem = record;
            }
            openUserModal(OPERATION_DEL_ITEM);
        }
    }

    //
    // delUserOk(record, delItem) {
    //     const {operation} = this.props.user;
    //     const {openUserModal} = this.props;
    //     if (delItem) {//从弹出窗口回调而来的
    //         operation(2, delItem);
    //     } else {
    //         if (record) {
    //             this.currentItem = record;
    //         }
    //         openUserModal(2);
    //     }
    // }
    search(keyword) {
        this.setState({keyword: keyword});
    }

    /**
     * 本地搜索集群列表
     */
    filterUserList() {

        const {data} = this.props.user.userList;
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
        const {queryUserList} = this.props;
        queryUserList();
    }

    render() {

        const menu = (
            <Menu>
                <Menu.Item key="1">上传EXCEL</Menu.Item>
            </Menu>
        );

        const {userList, operationData} = this.props.user;
        const parent = this;
        //noinspection JSUnusedLocalSymbols
        const columns = [
            {
                title: '用户名',
                dataIndex: 'name',
                width: 200,
                key: 'name'
            }, {
                title: '是否有效',
                dataIndex: 'locked',
                width: 100,
                key: 'locked',
                render(text){
                    const style = {paddingLeft: '18px'};
                    if(text){
                        return <Icon type="close" style={style}/>
                    }else {
                        return <Icon type="check" style={style}/>
                    }
                }
            }, {
                title: '所属角色',
                dataIndex: 'roles',
                width: 170,
                key: 'roles'
            }, {
                title: '创建日期',
                dataIndex: 'createTime',
                width: 170,
                key: 'createTime'
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


        return (
            <div className='user-list'>
                <div style={{margin:'10px 0px',height:'auto',minWidth:'560px'}}>

                    <SearchInput placeholder="search by name or description"
                                 onSearch={keyword => this.search(keyword)} style={{ width: '25%' }}/>

                    <div style={{float:'right'}}>
                        <Button type="primary" icon="reload" onClick={this.refresh.bind(this)}
                                loading={userList.pending}
                                className='button'/>
                        <Button type="ghost" icon="plus" className='button'
                                onClick={this.onOk.bind(this,this.buildEmptyUser(),null,OPERATION_ADD_ITEM)}>
                            添加</Button>

                        <DropdownButton overlay={menu} type="primary" style={{margin:'0px 6px'}}>
                            更多操作
                        </DropdownButton>
                    </div>

                </div>
                <div>
                    <Table
                        style={{}}
                        dataSource={this.filterUserList()}

                        // onRowClick={this.onRowClick.bind(this)}
                        pagination={false}

                        columns={columns}
                        loading={userList.pending}
                        size='middle'
                        rowKey={record=>record.id}/>

                </div>
                <UserModal visible={ operationData.currentOpenModal == 1 }
                                 onOk={this.onOk.bind(this)}
                                 pending={operationData.pending}
                                 item={this.currentItem}/>

                <DelUserModal visible={ operationData.currentOpenModal == 2 }
                                 onOk={this.onOk.bind(this)}
                                 pending={operationData.pending}
                                 item={this.currentItem}/>
            </div>

        )
    }
}
UserList.propTypes = {
    // userList: PropTypes.shape({
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

UserList.defaultProps = {};
export default UserList;