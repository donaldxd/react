import React, { Component } from 'react';
import './productbrief.css';
var moment = require('moment');

class ProductBrief extends Component {

    constructor(){
        super();
        this.getLatestData=this.getLatestData.bind(this);
    };  

    getLatestData(data){
        let result = data;
        let arr =[];
        if (data!=null){       
        for (var index=data.length-1;index>=0;index--) {
            if (this.props.etfId===result[index].Fundid){
            arr.push(result[index].Fundid);
            arr.push(result[index].price);
            arr.push(result[index].IOPV);
            arr.push(result[index].premium);
            var d=new Date(result[index].updatedon);
            arr.push(moment(d.setTime(d.getTime()+d.getTimezoneOffset()*60*1000)).format("H:mm:ss, MMM Do"));
            break;
           }            
        }}
       return arr;

    }
    
  
    render() {
        const list = this.getLatestData(this.props.data);
        return (
      <div className="ProductBrief">          
          <table>
              <tbody>
              <tr>
                <th className="fundname">{list[0]}</th>                
              </tr>
              <tr>
                <th className="itemtitle">Price</th>
                <td className="datafeed"> {list[1]}</td>
                <th className="itemtitle">IOPV</th>
                <td className="datafeed">{list[2]}</td>
                <th className="itemtitle">Premium</th>
                <td className="premium">{parseFloat(list[3]).toFixed(2)+"%"}</td>
              </tr>              
              </tbody> 
              <tbody>
              <tr>
                <th className="itemtitle2">Updated on</th>
                <td colSpan="3" className="datafeed2">{list[4]}</td>
              </tr>
              </tbody>
          </table>              
      </div>
    );
  }
}

export default ProductBrief;