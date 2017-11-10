import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import etfData from './data/test.json';
import App from './App';
import TableList from './TableList';
import ProductBrief from './ProductBrief';
import RealtimeChart from './RealtimeChart';
//import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';

class Entry extends React.Component{

    constructor(props) {
        super(props);
       
        this.state = { 
            buttonId: "2822.HK",
            data: [] };
        this.changeButtonId=this.changeButtonId.bind(this);
        this.refreshData=this.refreshData.bind(this);
      }

    changeButtonId(newId){
        this.setState({buttonId:newId});
    }

    componentWillMount(){
        this.refreshData();
    }

    refreshData(){
           $.ajax({
               type: "GET",
               url:"http://192.168.152.116:3028/historic_datafeed",
               data: {},
               dataType:'json',
               success:function(data){
                   this.setState({data:data});
               }.bind(this),
               error:function(e){
                   console.log(e.toString());
               }
           });
       }

    componentDidMount(){        
         setInterval(this.refreshData,10000)
     }    
  
    render(){     

        return (
        <div className='container'>  
            <div className='tablelist'>
             <TableList onchange={this.changeButtonId}/>
            </div>
        
        {/*this is for debugging
        <h3>
        The selected button is {this.state.buttonId}
        </h3> */}
        
            <div className='dashboard'>
                <div className='productbrief'>
                <ProductBrief etfId={this.state.buttonId} data={this.state.data} />
                </div>
                <div className='realtimechart'>
                <RealtimeChart etfId={this.state.buttonId} data={this.state.data} />
                </div>
            </div>
        </div>    
    )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Entry />, document.getElementById('tablelist'));
//registerServiceWorker();

