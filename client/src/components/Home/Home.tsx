import React from 'react'
import AddExpenseModal from './AddExpenseModal'
import ExpenseList from './ExpenseList'
import PieChart from './BudgetOverview'
import {connect} from 'react-redux'
import CategoryGraph from './CategoryGraph'
import {Row,Col} from 'antd'
class Home extends React.Component <any,any> {
    render(){
        return(
            <>
            {this.props.budget._id?null:<h1>Add budget in the settings page!!</h1>}
            {this.props.categories.length===0?<h1>No Categories Added. You can add a Category in settings page!!</h1>:null}
            {this.props.expenses.length===0?<h1>No Expenses to show you can add an expense by clicking add expense button!!</h1>:null}
            <Row>
                <Col span={12}>
            {this.props.expenses.length>0 ? <PieChart/>:null}
            </Col>
            <Col span={6} offset={3}>
            {this.props.expenses.length>0 ? <CategoryGraph/>:null}
            </Col>
            </Row>
            <Row>
                <Col span={5} offset={1}>
            <AddExpenseModal/>
            </Col>
            </Row>
            <Row>
                <Col span={20}>
            <ExpenseList/>
            </Col>
            </Row>

            </>
        )
    }

}
const mapStateToProps=(state:any)=>{
    return{
        budget:state.budget,
       categories:state.categories,
        expenses:state.expenses
    }
    
}

export default connect(mapStateToProps)(Home)