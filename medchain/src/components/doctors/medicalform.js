import React, { useState, useEffect } from 'react'
import { Form, MedicalFormWrapper, Inputs, InputWrapperOne, InputsTwo, InputsThree } from './medicalform.elements';
import { InputButton } from './doctor.elements';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

const axios = require('axios');
    

const MedicalForm = props => {
    const [id, setId] = useState('');
    const [hospital, setHospital] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [perscription, setPerscription] = useState('');
    const [comment, setComment] = useState('');
    const [bool, setBool] = useState(true);
    

    useEffect(()=>{
        if(props.check && bool){ 
           setId(props.pubkey); 
           setBool(false);
          
        }
        if(!props.check && !bool ){
            
            setBool(true);
            setId('');
        }
    });
          
    const GreenCheckbox = withStyles({
        root: {
          color:"#01bf71",
          },
        },
      )((props) => <Checkbox color="default" {...props} />);

    console.log(props.pubkey);
    console.log(props.sig);
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
            if(!props.checked){
                setId('');
            }
            setBool(true);
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
                    <Inputs disabled={props.check} value={id} placeholder="ID" onChange={e => setId(e.target.value)} />
                    <Inputs value={hospital} placeholder="Hospital this block was issued from" onChange={e => setHospital(e.target.value)} /> 
                </InputWrapperOne>
                <InputsTwo value={diagnosis} placeholder="Patient Diagnosis" onChange={e => setDiagnosis(e.target.value)} />
                <InputsThree value={perscription} placeholder="Perscription if required" onChange={e => setPerscription(e.target.value)} />
                <InputsThree value={comment} placeholder="Additional Notes" onChange={e => setComment(e.target.value)}/>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <FormControlLabel  disabled={!props.check} checked={props.check} control={<GreenCheckbox  name="checkedG" />} label="Signature" />
                    <InputButton type='submit' value='Add Block'></InputButton>
                </div>  
            </Form>
            
        </MedicalFormWrapper>
    )
}

export default MedicalForm
