/**
 * 折线图
 */
import React ,{Component} from 'react';
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react';
class Line extends Component{
    constructor(props){
        super(props)
        this.state = {
            sales:[5, 20, 36, 10, 10, 20],
            stores:[15, 120, 6, 40, 110, 20]
        }
    }
    /**
     * 折线图的配置对象
     */
    getOption = (sales,stores) =>{
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量','库存']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: sales
            },
            {
                name: '库存',
                type: 'line',
                data: stores
            }]
        };
    }
    render(){
        const {sales,stores} = this.state;
        return(
            <div>
                <Card>
                    <ReactEcharts option={this.getOption(sales,stores)} />
                </Card>
            </div>
        )
    }
}
export default Line;