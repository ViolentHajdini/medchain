import React, { useState } from 'react'
import { Form, MedicalFormWrapper, Inputs, InputWrapperOne, InputsTwo, InputsThree } from './medicalform.elements';
import { InputButton } from './doctor.elements';
const axios = require('axios');

const MedicalForm = props => {
    const [id, setId] = useState('')
    const [hospital, setHospital] = useState('')
    const [diagnosis, setDiagnosis] = useState('')
    const [perscription, setPerscription] = useState('')
    const [comment, setComment] = useState('')

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('/record/new', {
            id: id,
            data: {
                hospital: hospital,
                diagnosis: diagnosis,
                perscription: perscription,
                comment: comment
            }
        })
        .then(res => {
            setId('');
            setHospital('');
            setDiagnosis('');
            setPerscription('');
            setComment('');
            props.handleRemount(true);
            return console.log(res)
        })
        .catch(()=>{
            alert("ID could not be found.");
            console.log('Error:','ID could not be found');
        });
        
        
    }

    return (
        <MedicalFormWrapper>
            <Form onSubmit={handleSubmit}>
                <h1 style={{color:'#00ab65'}}> Medical Form </h1>
                <InputWrapperOne>
                    <Inputs value={id} placeholder="ID" onChange={e => setId(e.target.value)} />
                    <Inputs value={hospital} placeholder="Hospital this block was issued from" onChange={e => setHospital(e.target.value)} /> 
                </InputWrapperOne>
                <InputsTwo value={diagnosis} placeholder="Patient Diagnosis" onChange={e => setDiagnosis(e.target.value)} />
                <InputsThree value={perscription} placeholder="Perscription if required" onChange={e => setPerscription(e.target.value)} />
                <InputsThree value={comment} placeholder="Additional Notes" onChange={e => setComment(e.target.value)}/>
                <InputButton type='submit' value='Add Block'></InputButton>
            </Form>
            
        </MedicalFormWrapper>
    )
}

export default MedicalForm
