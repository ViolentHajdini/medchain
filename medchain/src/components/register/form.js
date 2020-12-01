import React, { useState } from 'react';
import { FormWrapper, Inputbtn, Inputtxt, Select } from './form.elements';
const axios = require('axios');

const Form = () => {
    const [key, setKey] = useState("");
    const [opt, setOpt] = useState("doctor");
    
    const handleSubmit = e => {
        e.preventDefault();
        axios.get(`/search/${opt}/${key}`).then(res => console.log(res.data));
    }
    
    return (
        <div>
            <FormWrapper onSubmit={handleSubmit}>
                <Select value={opt} onChange={e => setOpt(e.target.value)}>
                    <option value="doctor"> Doctor </option>
                    <option value="patient"> Patient </option>
                </Select>
            </FormWrapper>
        </div>
    )
}

export default Form;