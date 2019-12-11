import React from 'react'
import {startAddUserImage} from '../../actions/user'
import { connect } from 'react-redux';
import {Button} from 'antd'
import swal from 'sweetalert2';


class Avatar extends React.Component<any,any>{
constructor(props:any){
  super(props)
}
  state = {
    file:'',
    imageurl:'',
    isdisabled:false
  };
  
  handleFile = (e:any) => {
    const file = e.target.files
    this.setState({file:file[0]})
}
handleSubmit=(e:any)=>{
  e.preventDefault()
  this.setState({isdisabled:true})
    swal.fire('Please wait image is uploading!!')
    setTimeout(()=>{
      this.setState({isdisabled:false})
    },6000)
  const formData=new FormData()
            formData.append('file',this.state.file)
           this.props.dispatch(startAddUserImage(formData))
}
  render() {
    return (
      <>
      <form onSubmit={this.handleSubmit}>
          <label><strong>Upload-Photo:</strong>
          <input type="file" onChange={this.handleFile}/>
          </label>
          <br/>
          <br/>
          <Button htmlType="submit" type="primary" size="large" disabled={this.state.isdisabled}>Submit</Button>
      </form>
      </>
    );
  }
}


export default connect()( Avatar)

