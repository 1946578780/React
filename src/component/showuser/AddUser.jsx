import { Form, Input } from 'antd';
import React from 'react'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
class AddUser extends React.Component {
  formRef = React.createRef()
  constructor() {
    super();
    this.state = {
      datas: {}
    }
  }
  componentDidMount() {
    this.props.getfrom(this.formRef)
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps.Modal)
    // if (!nextProps.modal.isShowEditModal) {
    //   this.props.form.resetFields();
    // }
    // this.setState({
    //   datas : nextProps.userUpdataData.listViews
    // })
  }
  render() {
    const { username, email, password, password_digest } = this.props.userUpdataData.listViews
    console.log(username)
    return (
      <Form {...layout}
        name="nest-messages"
        ref={this.formRef}
        initialValues={{ username, email, password, password_digest }}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
        >
        <Input type="text" name="username"/>
        </Form.Item>
        <Form.Item
          name='email'
          label="邮箱"
          rules={[
            {
              type: 'email',
              required:true
            },
          ]}
          hasFeedback
        >
          <Input name="email"/>
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password name="password" />
        </Form.Item>

        <Form.Item
          name="password_digest"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password name="password_digest" />
        </Form.Item>
      </Form>
    );
  }
}


export default AddUser