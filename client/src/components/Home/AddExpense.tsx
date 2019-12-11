import React from 'react';
import {connect} from 'react-redux'
import { Form,Icon, Input, Button ,Dropdown,DatePicker,Menu} from 'antd';
import * as moment from 'moment'
import swal from 'sweetalert2';

class AddExpense extends React.Component <any,any> {
    constructor(props: any){
        super(props)
        this.state={
            category:(props.expense)?props.expense.category._id:'',
            item:(props.expense)?props.expense.item:'',
            amount:(props.expense)?props.expense.amount:'',
            expenseDate:(props.expense)?moment.default(props.expense.expenseDate):'',
            date:(props.expense)?moment.default(props.expense.expenseDate):moment.default(),
            categoryName:(props.expense)?props.expense.category.category:''
        }
    }
     handleMenuClick=(e:any)=> {
        this.setState({category:e.key,
            categoryName:e.item.props.children
        })
      }
    handleDate=(date: any, dateString: any)=> {
        this.setState({expenseDate:dateString,date})
      }
    handleChange=(e:any)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleExpenseSubmit=(e:any)=>{
        e.preventDefault()
        const {category,item,amount,expenseDate}=this.state
        if(category && item && amount && expenseDate){
        const expense={
            category,
            item,
            amount,
            expenseDate,  
        }
        this.props.handleExpenseSubmit(expense) 
        }
        else{
        swal.fire('Please fill all the fields!')
        }    
    }

    render(){
        const menu = (
            <Menu onClick={this.handleMenuClick}>
              {(this.props.categories.length>0)?
                this.props.categories.map((c:any)=>{
                    return(
                        <Menu.Item key={c._id}>
                        {c.category}
                        </Menu.Item>
                    )
                })
              :null}
            </Menu>
        )
        return(
            <div>
                <Form>
                    <Form.Item label="Category">
                        <Dropdown overlay={menu} disabled={this.props.categories.length>0?false:true} >
                        <Button> {(this.state.categoryName==='')?'Select    Category':this.state.categoryName}
                        <Icon type="down" />
                        </Button>
                        </Dropdown>
                        {this.props.categories.length===0?<p>No category.please add one in settings page</p>:null}
                    </Form.Item>
                    <Form.Item label="Item Name">
                        <Input
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Item Name"
                            name="item"
                            value={this.state.item}
                            />
                    </Form.Item>
                    <Form.Item label="Amount">
                        <Input
                            onChange={this.handleChange}
                            type="number"
                            placeholder="Amount"
                            name="amount"
                            value={this.state.amount}
                            />
                    </Form.Item>
                    <Form.Item label="Expense date">
                    <DatePicker onChange={this.handleDate} value={this.state.date} />
                    </Form.Item>
                    <Button type="primary" onClick={this.handleExpenseSubmit}>Submit</Button>
                    </Form>
            </div>

        )
    }
}
const mapStateToProps=(state:any)=>{
    return{
        categories:state.categories
    }
}

export default connect(mapStateToProps)(AddExpense)
