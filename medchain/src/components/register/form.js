import React, { Component } from 'react';
import { FormWrapper, Inputbtn, Inputtxt, Select } from './form.elements';

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { 
                value : ''
            };

        this.handleChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSubmit(event) {
        alert('A Blockchain was created fo: ' + this.state.value);
        event.preventDefault();
      }
              
      handleInputChange(event) {
        const target = event.target;
        const value = target.type;
        const name = target.name;

        this.setState({
            [name]:value
        });
    }

    render() {
        return (
            <div>
                <FormWrapper onSubmit={this.handleSubmit}>
                    <Inputtxt name='name' type='text' value={this.state.value} onChange={this.handleInputChange} placeholder='Name' >
                    </Inputtxt>
                    <Inputtxt name='surname' type='text' value={this.state.value} onChange={this.handleInputChange} placeholder='Surname' >
                    </Inputtxt>
                    <Select>
                        <option value = "doctor"> Doctor </option>
                        <option value = "patient"> Patient </option>
                    </Select>
                    <Inputbtn type='submit' value="Submit">
                    </Inputbtn>
                </FormWrapper>
            </div>
        )
    }
}

export default Form

