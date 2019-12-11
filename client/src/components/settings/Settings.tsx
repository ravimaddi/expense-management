import React from 'react';
import {connect} from 'react-redux'
import { Button,Input,Row,Col,List} from 'antd';
import {startSetBudget,startUpdateBudget,startAddCategory,startRemoveCategory} from '../../actions/settings'
import swal from 'sweetalert2'

class Settings extends React.Component <any,any> {
    constructor(props: any){
        super(props)
        this.state={
            budget:'',
            category:''
        }
        
    }
    handleChange=(e:any)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handlebudget=()=>{
        if(this.props.budget._id){
            this.props.dispatch(startUpdateBudget({budget:this.state.budget},this.props.budget._id))
            swal.fire('updated succesfully')
            
        }
        else{
            this.props.dispatch(startSetBudget({budget:this.state.budget}))
            swal.fire('Budget Added succesfully')
        }
    }
    handleCategory=()=>{
        const category=this.props.categories.find((c:any)=>{
            return this.state.category===c.category
        })
        if(!category){
            this.props.dispatch(startAddCategory({category:this.state.category}))
            this.setState({category:''})
        }
        else{
            swal.fire('Can not have two catogories with same name')
        }
      
    }

    handleCategoryDelete=(id:string)=>{
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this! Check if any expenses related to this category !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              swal.fire(
                'Deleted!',
                'category has been deleted.',
                'success'
              )
              this.props.dispatch(startRemoveCategory(id))
            }
          })
        
    }
    
    render(){
        const data=this.props.categories.map((c:any)=>{
            return(
                <div key={c._id}>
                    <Row>
                        <Col span={16}>
                        {c.category}
                    </Col>
                    <Col span={4} offset={4}>
                    <Button type="danger" onClick={()=>this.handleCategoryDelete(c._id)}>Delete</Button>
                    </Col>
                    </Row>
                </div>
            )
       })
        return(
            <>

            <Row style={{ marginBottom:'40px' }}>
                <Col span={3}><h2>Total Budget</h2></Col>
                <Col span={6} offset={1}>
              
                <Input name="budget" value={this.state.budget}  onChange={this.handleChange} size="large" placeholder="Total Budget" />
           
            </Col>
            <Col span={4} offset={1}>
            <Button type="primary" onClick={this.handlebudget} size='large'>Update</Button>
            </Col>
            </Row>
            <Row style={{ marginBottom:'40px' }}>
                <Col span={3}><h2>Categories</h2></Col>
                <Col span={6} offset={1}>
              
                <Input name="category" value={this.state.category} onChange={this.handleChange} size="large" placeholder="Category name" />
           
            </Col>
            <Col span={4} offset={1}>
            <Button type="primary" onClick={this.handleCategory}  size='large'>Add</Button>
            </Col>
            </Row>
            <Row >
                <Col span={12} offset={1}>
               {(this.props.categories.length>0?
                    <List
                        size="large"
                        header={<h3>Categories List</h3>}
                        bordered
                        dataSource={data}
                        renderItem={(item:any) => <List.Item>{item}</List.Item>}
                    />
                :null)}
                 </Col>  
            </Row>
            
            </>
        )
    }
}

const mapStateToProps=(state:any)=>{
    return{
      budget:state.budget,
      categories:state.categories
    }
  }

export default connect(mapStateToProps)(Settings)