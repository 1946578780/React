import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Modal } from 'antd';
import AddUser from './AddUser'
import { connect } from 'react-redux'
// import { getInputData } from '../../actions/userdata'
const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async e => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
  }

  return <td {...restProps}>{childNode}</td>;
};

class Childuser extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width: '30%',
        editable: true,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '密 码',
        dataIndex: 'password',
      },
      {
        title: '删除',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
              <Button type="primary">删除</Button>
            </Popconfirm>
          ) : null,
      },
      {
        title: '修改',
        dataIndex: 'updata',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <span onClick={() => this.handleUpdata(record.id)}>
              <Button type="primary">修改</Button>
            </span>
          ) : null,
      }
    ];
    //数据源
    this.state = {
      dataSource: [],
      setuser: false,
      isShowEditModal: false,
      isVersTeckenEditModal: true,
      childData: {},
    };
  }
  //模块渲染前获取数据
  UNSAFE_componentWillMount() {
    this.props.userdata.UserData().then(res => {
      this.setState({
        dataSource: res.data
      })
    })
  }
  //修改
  handleUpdata = (id) => {
    this.setState({
      isShowEditModal: true,
      setuser: true,
      childDataId: id
    }, () => {
      if (this.state.setuser){
        this.props.userdata.UserUpdata(id).then(
          (res) => {
            // console.log(res)
            // this.setState({
            //   // childData: res.data[0]
            // })
            // console.log(this.state.childData)
          }
        )
      }
    })
  }
  //添加模态框
  handleAdd = () => {
    this.setState({
      isShowEditModal: true,
      setuser: false,
    })
  };
  //删除
  handleDelete = (id) => {
    this.props.userdata.UserDelete(id).then(
      () => {
        const dataSource = [...this.state.dataSource];
        this.setState({
          dataSource: dataSource.filter(item => item.id !== id),
        });
        this.props.flashMessage.addFlashMeeage({
          type: "success",
          text: "删除成功！"
        })
      }
    )
  }
  //状态
  stateType = () => {
    if (this.state.setuser) {
      this.handleUpdata()
      return
    }
    if (!this.state.setuser) {
      this.handleAdd()
    }
  }
  //隐藏模态框
  isVersTecken = () => {
    this.setState({
      isShowEditModal: false,
      // childData:""
    })
  }
  //点击提交触发
  handleOk = () => {
    const { count, dataSource, setuser, childDataId } = this.state;
    this.formRef.current.validateFields().then(values => {
      if (!setuser) {//如果是添加
        this.props.userdata.UserModify(values).then(
          (res) => {
            const id = res.data.pop()
            this.props.flashMessage.addFlashMeeage({
              type: "success",
              text: "添加成功！"
            })
            const newData = {
              id: id.id,
              username: values.username,
              email: values.email,
              password: values.password,
              password_digest: values.password_digest
            };
            this.setState({
              dataSource: [...dataSource, newData],
              count: count + 1,
              isShowEditModal: false
            });
          }
        )
      } else {
        this.props.userdata.UpdataUserdata(values, childDataId).then(
          (res) => {
            const id = res.data[0]
            this.props.flashMessage.addFlashMeeage({
              type: "success",
              text: "修改成功！"
            })
            const newData = {
              id: id.id,
              username: values.username,
              email: values.email,
              password: values.password,
              password_digest: values.password_digest
            };
            // console.log(newData)
            this.setState({
              dataSource: [...dataSource, newData],
              isShowEditModal: false
            },()=>{
              // console.log(this.state.dataSource)
            })
          }
        )
      }
    })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }
  //循环数据
  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource, setuser } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Modal
          title={setuser ? "修改" : "添加"}
          visible={this.state.isShowEditModal}
          destroyOnClose={true}
          onOk={this.handleOk}
          onCancel={this.isVersTecken}
        >
          <AddUser
            childData={this.state.childData}
            getfrom={(from) => { this.formRef = from}}
            userUpdataData={this.props.userUpdataData}
          />
        </Modal>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          添加用户
        </Button>
        {
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
            rowKey={record => record.id}
          />
        }
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return{
    userUpdataData : state.userdata
  }
}

export default connect(mapStateToProps)(Childuser)