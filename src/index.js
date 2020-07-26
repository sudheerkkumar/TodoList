import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './font-fa-min.css';

class InputBox extends React.Component{
  render(){
    return(
      <input type="search" name='InputBox1' placeholder='Add...' id='ib1'></input>
    )
  }
}

class Item extends React.Component{
  render(){
    return(
      <tr itemID={this.props.itemID}>
      {this.props.isEdit ?
       <td><input type='text' className='editBox' 
            id={'editbox'+this.props.itemID}>
       </input>
       </td>:
       <td className="itemName">{this.props.item} </td>}
      <td><button className="fa fa-trash" name={this.props.itemID} 
      onClick={()=> this.props.deleteItem(this.props.item)}></button></td>
      {this.props.isEdit ? 
        <td><button className="fa fa-check" 
              name={'save'+this.props.itemID} 
              onClick={()=>this.props.saveItem(this.props.item,
                          document.getElementById('editbox'+this.props.itemID).value)}>
              </button></td>:
      <td><button className="fa fa-edit" 
              name={'edit'+this.props.itemID} onClick={()=>this.props.handleModifyUI(this.props.item)}>
              </button></td>
      }
     </tr>
    )
  }
}
class DisplayItems extends React.Component{
  render(){
    var items = this.props.items; 
    //performing sorting before displaying the items
    var i=0;
    return(
     <table>
     <tbody>
     {items.map(item => {
        i++;
        return (<Item key={i} itemID={i} isEdit={item.isEdit} 
        item={item.name} 
        deleteItem={this.props.deleteItem}
        handleModifyUI={this.props.handleModifyUI}
        saveItem={this.props.saveItem}
        />)
      }
      )}</tbody></table>
    
    )
  }
}
class P1 extends React.Component{
  render(){
    return (
      'items'
    )
  }
}
class Mpage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      inputValue: '',
      items : [],
    }
  }

  handleChange = (event) => {
    this.setState( { inputValue : event.target.value } )
  }

  addItem = () =>{
    var items = []
    items = this.state.items;
    var newItem = {
      name: this.state.inputValue,
      isEdit: false
    }
    items.push(newItem);
    this.setState({items : items})
    this.setState({inputValue : ''})
  }

  deleteItem = (item) =>{
    var items = this.state.items;
   // console.log(item)
    for(var i=0;i<items.length;i++){
      if(items[i].name==item){
        items.splice(i, 1); 
        i--; 
        break;
      }
    }
   // console.log(items)
    this.setState({items: items})
  }

  handleModifyUI = (item) => {
    var items = this.state.items;
     for(var i=0;i<items.length;i++){
       if(items[i].name==item){
        items[i].isEdit = true
         break;
       }
     }
     this.setState({items: items})
  }

  saveItem = (item, newItem)=> {
    var items = this.state.items;
    var nItem = {
      name: newItem,
      isEdit: false
    }
    for(var i=0;i<items.length;i++){
      if(items[i].name == item){
        items[i].name = newItem
        items[i].isEdit = false
        break;
      }
    }
    this.setState({items: items})
  }

  render(){
    return(
      <div>
      <center>
      <p>Hello world!</p>
      <input type="search" name='InputBox1'
       placeholder='Add...' id='ib1'
       value={this.state.inputValue} 
       onChange={this.handleChange}></input>
      <button className="plus" onClick={this.addItem}></button><br></br>
      <P1 /><br></br>
      <DisplayItems items={this.state.items} 
      deleteItem={this.deleteItem}
      handleModifyUI={this.handleModifyUI}
      saveItem={this.saveItem} />
      </center>
      </div>
    )
  }
}
ReactDOM.render(
  <React.StrictMode>
    <Mpage />
  </React.StrictMode>,
  document.getElementById('root')
);
