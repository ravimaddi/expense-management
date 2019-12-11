import React from 'react';
import {startSetUser} from '../../actions/user'
import {connect} from 'react-redux'
import { Form,Icon, Input, Button,Row,Col } from 'antd';

class Login extends React.Component <any,any> {
    constructor(props: any){
        super(props)
        this.state={
            email:"",
            password:""
        }
    }
    handleChange=(e:any)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleLoginSubmit=(e:any)=>{
        
        e.preventDefault()
        const redirect= ()=>this.props.history.push('/')
        this.props.dispatch(startSetUser(this.state,redirect))
    }

    render(){
        return(
            <div>
                <Row>
                    <Col span={10}>
                  <h3>Login</h3>
                <Form onSubmit={this.handleLoginSubmit}>
                    <Form.Item>
                        <Input
                            type="email"
                            onChange ={this.handleChange}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                            name="email"
                            value={this.state.email}
                            required
                            />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            name="password"
                            onChange={this.handleChange}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            required
                            />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Log in
                        </Button>
                    </Form.Item>
                </Form>
                </Col>
                </Row>
            </div>

        )
    }
}

export default connect()(Login)
