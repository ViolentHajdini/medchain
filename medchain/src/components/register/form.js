import React, { useState } from 'react';
import { FormWrapper, Inputbtn, Inputtxt, Select } from './form.elements';
const axios = require('axios');

const Form = () => {
    const [key, setKey] = useState("");
    const [opt, setOpt] = useState("doctor");
    
    const handleSubmit = e => {
        e.preventDefault();
        axios
        .get(`/search/${opt}/${key}`)
        .then(res => console.log(res.data));
    }
    
    return (
        <div>
            <FormWrapper onSubmit={handleSubmit}>
                <Inputtxt name='name' type='text' value={key} onChange={e => {setKey(e.target.value)}} placeholder='Key'></Inputtxt>
                <Select value={opt} onChange={e => setOpt(e.target.value)}>
                    <option value="doctor"> Doctor </option>
                    <option value="patient"> Patient </option>
                </Select>
                <Inputbtn type='submit' value="Submit">
                </Inputbtn>
            </FormWrapper>
        </div>
    )
}

export default Form;