import React, {Component} from 'react';

class Test extends Component{
    constructor(props){
        super(props);
        this.state ={
            id: '',
            pass: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            pass: event.target.value
        });
        console.log(this.state.pass);

    }

    handleSubmit(event){
        this.props.handleAlter(this.state.pass);
        this.props.history.push("/patient/:id");
        event.preventDefault();

       
    }

    

    render(){
        return(
            <div>
                {this.props.test}
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.pass} onChange={this.handleChange}/>
                    <input type="submit" value="Submit" />
                </form>
                
            </div>
        )
    };
}


export default Test;