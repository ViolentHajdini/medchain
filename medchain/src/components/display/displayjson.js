import React, {Component} from 'react';
import './displayjson.css'; 
import data from "./test.json";

const testing = [{movie:"red rocket", car:"nissan", anime: "watamote"}];

class Displayjson extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            json: [],
            new_name: '',
            patient: null,
            timestamp: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event){
        data.names.push(this.state.new_name);
        this.setState({json: data.names});
        this.setState({new_name: ''});
        console.log(this.state.json);
        event.preventDefault();
        console.log('submit handled');

    }
   
    handleChange(event){
        this.setState({new_name: event.target.value });
        console.log('change handled');
    }

    componentDidMount(){
        this.getjson();
        console.log( testing[0].anime);
        console.log('mounted');
    }

    getjson(){
        fetch('/record/chain', {method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"} ).then(response => 
            response.json().then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
              }));
        this.setState({json : data.names});
        console.log('recieved json');
    }

    render(){
        return(
            <div className="box">
                <form className="input-box" onSubmit={this.handleSubmit} > 
                    <label>
                        name: 
                        <input 
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.new_name}
                        /> 
                    </label>
                    <input
                        type="submit"
                        name="submit"
                        value="submit"
                    />
                </form>
                {this.state.json.map(function(name, index){
                     return <li key={index}> {name} </li> 
                })}
         
                
            </div>
        );
    }
}

export default Displayjson;