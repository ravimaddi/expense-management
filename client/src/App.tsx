import React from 'react';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'
import Register from './components/user/Register'
import {connect} from 'react-redux'
import Login from './components/user/Login'
import {startRemoveUser} from './actions/user'
import { Layout,Menu, Icon ,Row, Col, } from 'antd';
import Settings from './components/settings/Settings'
import swal from 'sweetalert2'
import Home from './components/Home/Home'
import './App.css'
import Profile from './components/user/Profile'
import PrivateRoute from './components/PrivateRoute' 

const { Sider,Content } = Layout;
const App: React.FC = (props:any) => {
  
  return (
    <>
    <BrowserRouter>
      <Row>
        <Col span={4}>
          <Layout> 
            <Sider
            style={{
              background:'#fff',
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              
            }}
            >
      { (Object.keys(props.user).length===0)?(
        <React.Fragment>
          <span className="logo nav-text">Expenseeve</span>
            <Menu  theme="light" mode="inline" defaultSelectedKeys={['4']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span className="nav-text"> Register</span>
                <Link to ="/users/register" /> 
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="login" />
                <span className="nav-text"> Login</span>
                <Link to ="/users/login" /> 
              </Menu.Item>
            </Menu>
            
        </React.Fragment>
      ):
      <React.Fragment>
        <span className="logo nav-text">Expenseeve</span>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
        
            <Menu.Item key="1">
              <Icon type="home" />
              <span className="nav-text">Home</span>
              <Link to ="/"/>
            </Menu.Item>
              <Menu.Item key="2">
              <Icon type="setting" />
              <span className="nav-text">Settings</span>
              <Link to ="/settings"/>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user" />
              <span className="nav-text">Profile</span>
              <Link to ="/profile"/>
            </Menu.Item>
              <Menu.Item key="4">
              <Icon type="logout" />
              <span className="nav-text">Logout</span>
              <Link to ="#" onClick={()=>{
              swal.fire({
                title: 'Are you sure?',
                text: "You will be logged out!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
              }).then((result) => {
                if (result.value) {
                  swal.fire(
                    'Logged out!',
                    'You have been logged out.',
                    'success'
                  )
                  props.dispatch(startRemoveUser())
                }
              })  
            }}/>
            </Menu.Item>
            </Menu>
       </React.Fragment>
          }
          </Sider>
        </Layout>
      </Col> 
          <Col span={20}> 
          <Switch>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Route  path="/users/register" component={Register}/>
            <Route  path ="/users/login" component={Login}/>
            <PrivateRoute path="/settings" component={Settings}/>
            <PrivateRoute path="/" exact={true} component={Home}/>
            <PrivateRoute path='/profile' component={Profile}/>
          </Content>
        </Switch>
        </Col> 
      </Row>
      </BrowserRouter>
    </>
  );
}
const mapStateToProps=(state:any)=>{
  return{
    user:state.user
  }
}

export default connect(mapStateToProps)(App)


