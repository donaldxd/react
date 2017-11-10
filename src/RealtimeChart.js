import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
var moment = require('moment');

class RealtimeChart extends Component {
  
    constructor(){
        super();
        this.getOption=this.getOption.bind(this);
        this.handleData=this.handleData.bind(this);
    };   
    
    handleData(data){
        let result = data;
        let arr =[];        
        for (var index in result) {
            if (this.props.etfId===result[index].Fundid){
            let dataArr=[];
            dataArr.push(result[index].Fundid);
            dataArr.push(result[index].price);
            dataArr.push(result[index].IOPV);
            dataArr.push(result[index].premium);
            var d=new Date(result[index].updatedon);
            dataArr.push(d.setTime(d.getTime()+d.getTimezoneOffset()*60*1000));
            arr.push(dataArr); 
            }            
        }
      // console.log(arr);
       return arr;

    }

    getOption(){
        const option = {
            title: {
                text:""
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0];
                    var d = new Date(params.value[4]);
                    return (moment(d).format("H:mm:ss") +'<br>IOPV:' +params.value[2] + '<br>price:' +params.value[1]);
                }
            },
            legend: {
                data:['price','IOPV'],
                y:'bottom'
            },
            toolbox: {
                show: true,
                x:'right',
                feature: {
                    dataView: {
                        title : 'Data View',
                        readOnly: true,
                        lang: ['Data View', 'Close', 'Refresh']
                    },
                    restore: {title : 'Restore'},
                    saveAsImage: {title : 'Save'}
                }
            },

            
            xAxis: [
                {
                    type: 'time',
                                   
                    interval:1800000,
                   splitLine: {
                    show: false
                    },      
                    axisLabel:{
                       formatter:function(value,index){
                            var date = new Date(value);
                            return moment(date).format("H:mm");
                       }
                    }      
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    splitLine: {
                        show: true
                    }
                },
                    ],
            series: [
                {
                    name:'price',
                    type:'line',
                    showSymbol: false,
                    dimensions:['Fundid','price','IOPV','premium','updatedon'],
                    encode: {
                       x: 'updatedon',
                       y: 'price'
                    },
                    data: this.handleData(this.props.data)
                },   
                

                {
                    name:'IOPV',
                    type:'line',
                    showSymbol: false,
                    dimensions:['Fundid','price','IOPV','premium','updatedon'],
                    encode: {
                       x: 'updatedon',
                       y: 'IOPV'
                    },
                    data: this.handleData(this.props.data)
                },  
            ]          

        };

        return option;
    }



    render() {
        return (    
          <ReactEcharts
                option={this.getOption()}
                style ={{height:'500px',width:'900px'}}
                />
    );
  }
}

export default RealtimeChart;