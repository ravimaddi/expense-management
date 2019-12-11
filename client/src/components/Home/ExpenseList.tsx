import React from 'react'
import {Table,Button,Divider} from 'antd'
import {connect} from 'react-redux'
import EditExpenseModal from './AddExpenseModal'
import {startUpdateExpense} from '../../actions/expense'
import swal from 'sweetalert2'
class ExpenseList extends React.Component<any,any>{
    handledel=(e:any)=>{
      if(e.isdelete){
        e.isdelete=false
        this.props.dispatch(startUpdateExpense(e,e._id))
        swal.fire({
          icon: 'success',
          title: 'Restored succesfully',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else{
        e.isdelete=true
        this.props.dispatch(startUpdateExpense(e,e._id))
        swal.fire({
          icon: 'success',
          title: 'Deleted succesfully',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
    render(){

        const data=this.props.expenses.map((e:any)=>{
            return(
                    {
                    key: e._id,
                    category:(e.category)?e.category.category:'category is deleted!',
                    item:e.item,
                    amount:e.amount,
                    expenseDate:e.expenseDate.slice(0,10),
                    actions:<span>
                    {e.isdelete?null:<EditExpenseModal disabled ={(e.category)?false:true} expense={e}/>}
                    {e.isdelete?null:<br/>}
                    <Button
                    type="danger" 
                    size="small" 
                    disabled={(e.category)?false:true}
                    onClick={()=>this.handledel(e)}>{e.isdelete?'Restore':'Delete'}
                    </Button>
                    </span>
                }
                    
            )
        })

        const columns = [
            {
              title: 'Category',
              dataIndex: 'category',
              key: 'category',
            },
            {
              title: 'Item Name',
              dataIndex: 'item',
              key: 'item',
            },
            {
              title: 'Amount',
              dataIndex: 'amount',
              key: 'amount',
            },
            {
                title: 'Expense date',
                dataIndex: 'expenseDate',
                key: 'expenseDate',
              },
              {
                title:'Actions',
                dataIndex:'actions',
                key:'actions'
              }
          ];
          
        return(
            <>
        <h1>Expense List</h1>
        <Table pagination={{ pageSize: 5 }}  dataSource ={data}columns={columns} />
        </>
        )
    }
}
const mapStateToProps=(state:any)=>{
    return{
        expenses:state.expenses
    }
} 

export default connect(mapStateToProps)(ExpenseList)