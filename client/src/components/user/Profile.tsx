import React from 'react';
import {connect} from 'react-redux'
import { Card,Row,Col} from 'antd';
import Avatar from './Upload'
import swal from 'sweetalert2'

class Profile extends React.Component <any,any> {
   render(){
        return(
            <div>
                 <Row>
                <Col span={8}>
            <Card title="User Profile" bordered={false} style={{ width: 300 }}>
              <h3>Name:</h3>
                <p>{this.props.user.name}</p>
                <hr/>
                <h3>Email:</h3>
                 <p>{this.props.user.email}</p>
                 <hr/>
                <h3>Mobile:</h3>
                 <p>{this.props.user.mobile}</p>
                 <br/>
            </Card>
            <Avatar/>
            </Col>
            <Col span={16}>
            {(this.props.user.image)?<img src={this.props.user.image} alt="user photo"/>:null}
            </Col>
            </Row>
          </div> 

        )
    }
}

const mapStateToProps=(state:any)=>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(Profile)
