import React, { Component } from 'react';
import './TableList.css';
import fundinfo from './data/fundinfo.json';

class TableList extends Component {
    constructor(props){
       super(props);
       this.selectETF=this.selectETF.bind(this);
    }

    selectETF(e){
        const name=e.target.id
        this.props.onchange(name);
    }

  render() {
    return (
      <div className="TableList">
          {fundinfo.map(function(m,index){
						 return <button key={m.FundID} id={m.FundID} onClick={this.selectETF}>{m.FundID}</button>;
					}.bind(this)) }
      </div>

    );
  }
}

export default TableList;
