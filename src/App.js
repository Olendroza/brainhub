import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import './App.css';

class App extends Component{  
  constructor(props){
    super(props) 

      this.state= {
        name:'tamp',
        surname:'',
        email:'',
        date:'',
        nameError:true,
        surnameError: true,
        mailError: true,
        dateError: true
      };
      function validateEmail(data){
        return /\S+@\S+\.\S+/.test(data)
      }
      function validateDate(data){

        return Date.parse(data)>Date.now()
      }
      function handleDataAdmission(data,componentName){
        switch (componentName){
        case 'name':
          if(data!=='')  
          this.setState({name:data,
                          nameError:false})
          else
          this.setState({nameError:true})
          break;
        case 'surname':
          if(data!=='')  
          this.setState({surname:data,
                          surnameError:false})
          else
          this.setState({surnameError:true})
          break;
        case 'email':  
        if(validateEmail(data))
          this.setState({mailError:false,
                          email:data});
        else
          this.setState({mailError:true})
          break;
        case 'date':  
        if(validateDate(data))
            this.setState({dateError:false,
                            date:data});
             else
            this.setState({dateError:true})
          break;

        }
        
      }

       function sendDataToServer(){
                    axios.post('http://localhost:3001/', {
                      name: this.state.name,
                      surname:this.state.surname,
                      email:this.state.email,
                      date:this.state.date
                    })
                    .then(function (response) {
                     alert('data send ' + '\n'+JSON.stringify(response.data.message));
                    })
                    .catch(function (error) {
                      let message=''
                      if(error.response.data!=='')
                        message =error.response.data;
                      
                      alert(error +'\n'+message);
                    });
       
      }

      this.handleDataAdmission=handleDataAdmission.bind(this);
      this.sendDataToServer=sendDataToServer.bind(this)
      }
  render(){
  return (
    <div className="App">
      <header className="Header">
        Simple form 
        </header>
      <div className="main">
      <div >
      </div>
      <div className="FieldsContainer">
        <div className="FieldDec">
          Imię
          </div>
        <div className="TextDataInput">
          <AddTextData onSubmit={this.handleDataAdmission}
                        name='name'
                        type='text'>
          </AddTextData>
          </div>
          <div className="InputErrorMessage" style={this.state.nameError ? {display: ''}:{visibility:'hidden'}}>
            Name have to be filled
          </div>
          <div className="FieldDec">
          Nazwisko
          </div>
        <div className="TextDataInput">
          <AddTextData onSubmit={this.handleDataAdmission}
                        name='surname'
                        type='text'>
                        </AddTextData>
          </div>
          <div className="InputErrorMessage" style={this.state.surnameError ? {display: ''}:{visibility:'hidden'}}>
            Surname have to be filled
          </div>  
          <div className="FieldDec">
          Email
          </div>
        <div className="TextDataInput">
          <AddTextData onSubmit={this.handleDataAdmission}
                        name='email'
                        type='text'>
          </AddTextData>
          </div>
          <div className="InputErrorMessage" style={this.state.mailError ? {display: ''}:{visibility:'hidden'}}>
            Invalid email
          </div>
          <div className="FieldDec">
          Data
          </div>
        <div className="TextDataInput">
        <AddTextData onSubmit={this.handleDataAdmission}
                        name='date'
                        type='date'>
          </AddTextData>
          </div>
          <div className="InputErrorMessage" style={this.state.dateError ? {display: ''}:{visibility:'hidden'}}>
            Invalid date
          </div>
      </div>
      <div>
      </div>
      </div>
            <Button disabled={this.state.dateError || this.state.mailError ||this.state.nameError||this.state.surnameError} 
                  style={{margin:'auto', display:'block'}}
                  onClick={this.sendDataToServer}>
                  Send to server
            </Button>
    </div>
  );
  }
}

class AddTextData extends Component{
  constructor(props){
      super(props);
      this.state={
        value: '',
        }
      this.handleChange = this.handleChange.bind(this);
      this.handleSumbit = this.handleSumbit.bind(this);
  }
  handleChange(e){
      this.setState({value: e.target.value});
  }
  handleSumbit(e){
      this.props.onSubmit(this.state.value,this.props.name);
  }
  render(){
      return(
          <div  onBlur={this.handleSumbit}>
              <TextField   
              placeholder={this.props.name}
              className={this.props.className}
              type={this.props.type}
              onChange={this.handleChange}/>
          </div>
      );
  }
}
export default App;
