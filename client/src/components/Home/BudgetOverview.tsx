import React from 'react'
import {Chart} from 'react-google-charts'
import {connect} from 'react-redux'
class PriorityChart extends React.Component<any,any>{
    constructor(props: any){
        super(props)
        this.state={
          totalBudget:'',
          totalexpenses:''
        }
    }
    
    render(){
        const pieOptions = {
            title: "Budget Summary",
            pieHole: 0.5,
            slices: [
              {
                color: "#2BB673"
              },
              {
                color: "#d91e48"
              }
            ],
            legend: {
              position: "bottom",
              alignment: "left",
              textStyle: {
                color: "233238",
                fontSize: 14
              }
            },
            tooltip: {
              showColorCode: true
            },
            chartArea: {
              left: 0,
              top: 0,
              width: "100%",
              height: "80%"
            },
            fontName: "Roboto"
          };
  
          let totalexpenses=0
          this.props.expenses.forEach((e:any)=>{
            totalexpenses=totalexpenses+e.amount
          })
          const totalBudget= this.props.budget.budget
          let percentage= (totalexpenses/totalBudget)*100
          percentage=Math.round(percentage * 100) / 100
          const remainingBudget=totalBudget-totalexpenses
        return(
            <div>
                <h2>Budget Summary</h2>
                <h3>Total Budget={totalBudget}</h3>
                <h3>Total Expenses={totalexpenses}</h3>
                <h3>Percentage Spent={percentage}%</h3>
                <Chart
                  chartType="PieChart"
                  data={[["Remaining Budget","Expenses"], ["Remaining Budget",remainingBudget], ["Expenses",totalexpenses]]}
                  options={pieOptions}
                  graph_id="PieChart"
                  width={"100%"}
                  height={"350px"}
                  legend_toggle
                />
            </div>
        )
    }

}
const mapStateToProps=(state:any)=>{
    return{
        budget:state.budget,
        expenses:state.expenses
    }
    
}

export default connect(mapStateToProps)(PriorityChart)
