import React from 'react'
import {Modal, Button} from 'antd';
import AddExpense from './AddExpense'
import {startSetExpense,startUpdateExpense} from '../../actions/expense'
import {connect} from 'react-redux'
import swal from 'sweetalert2'

class AddExpenseModal extends React.Component<any,any> {
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    let toatalExpenses= 0
    this.props.expenses.forEach((e:any)=>{
      toatalExpenses=toatalExpenses+e.amount
    })
    if(this.props.budget.budget===toatalExpenses && !this.props.expense){
      swal.fire('Please increase your budget to add expense !!')
      this.setState({
        visible: false
      });
    }
    else{
    this.setState({
      visible: true
    });
  } 
  };

  handleExpenseSubmit= (s:any) => {
    let totalExpenses= 0
    this.props.expenses.forEach((e:any)=>{
      totalExpenses=totalExpenses+e.amount
    })
    if(!this.props.expense) {
    if(this.props.budget.budget<Number(totalExpenses)+Number(s.amount)){
      swal.fire('Please increase your budget to add Expense!!')
      this.setState({
        visible: false
      });
    }
    else{
      swal.fire({
        icon: 'success',
        title: 'Expenses Added succesfully',
        showConfirmButton: false,
        timer: 1500
      })
      this.props.dispatch((startSetExpense(s)))
      this.setState({ loading: false, visible: false });
    }
  }
    else{
     if( this.props.expense.amount!==s.amount)
      {   
      if(this.props.budget.budget<Number(totalExpenses-this.props.expense.amount)+Number(s.amount)){
        swal.fire('Please increase your budget to add Expense!!')
      this.setState({
        visible: false
      });
      }
      else{
        swal.fire({
          icon: 'success',
          title: 'Updated succesfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.props.dispatch(startUpdateExpense(s,this.props.expense._id))
        this.setState({ loading: false, visible: false });
      }
    }
      else{
        swal.fire({
          icon: 'success',
          title: 'Updated succesfully', 
          showConfirmButton: false,
          timer: 1500
        })
      this.props.dispatch(startUpdateExpense(s,this.props.expense._id))
      this.setState({ loading: false, visible: false });
    }
  }
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible} = this.state;
    return (
      <div>
       
        <Button type="primary" size={this.props.expense?'small':'large'} onClick={this.showModal} disabled={this.props.disabled} >
        {this.props.expense? 'Edit Expense':'Add Expense'}
        </Button>
        
        <Modal
          visible={visible}
          title="Add Expense"
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" type="primary" onClick={this.handleCancel}>
              Back
            </Button>
          ]}
        >
            <AddExpense expense={this.props.expense} handleExpenseSubmit={this.handleExpenseSubmit}/>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps=(state:any)=>{
  return{
    budget:state.budget,
    expenses:state.expenses
  }
}

export default connect(mapStateToProps)(AddExpenseModal)