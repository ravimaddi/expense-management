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
            title: "category wise split",
            pieHole: 0.6,
            slices: [
              {
                color: "#2BB673"
              },
              {
                color: "#d91e48"
              },
              {
                color: "#007fad"
              },
              {
                color: "#e9a227"
              },
              {
                color: "#000080"
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
          const col:string[]=[]
          const data=[]
          this.props.categories.forEach((c:any)=>{
          const ceList=  this.props.expenses.filter((e:any)=>{
            if(e.category){
               return e.category._id===c._id
            }
            })
            let sum=0;
            ceList.forEach((e:any)=>{
                sum=sum+e.amount
            })
            col.push(c.category)
            data.push([c.category,sum])
          })
          data.unshift(['CategoryName','Expense'])
        return(
            <div>
                <h2>Category wise split</h2>
                {this.props.categories.length<=5? 
                <Chart
                    chartType="PieChart"
                    data={data}
                    options={pieOptions}
                    graph_id="PieChart1"
                    width={"100%"}
                    height={"400px"}
                    legend_toggle
        />:<Chart
        width={'500px'}
        height={'300px'}
        chartType="Table"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          showRowNumber: true,
        }}
        rootProps={{ 'data-testid': '1' }}
      />
                }
            </div>
        )
    }

}
const mapStateToProps=(state:any)=>{
    return{
        budget:state.budget,
        expenses:state.expenses,
        categories:state.categories
    }
    
}

export default connect(mapStateToProps)(PriorityChart)
