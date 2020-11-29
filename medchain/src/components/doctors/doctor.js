import React, { useState } from 'react';
import { ArrowForward, ArrowRight } from '../LogIn/login.elements';
import { DoctorBackground, InputButton, FormWrapper, BlockchainWrapper, Input } from './doctor.elements';
import  MedicalForm  from './medicalform';


const Doctor = () => {

    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <DoctorBackground>
                <FormWrapper>
                    <MedicalForm />
                </FormWrapper>
                <BlockchainWrapper>
                    <Input></Input>
                    <InputButton type='submit' value="Find Patients Blockchain" /> 
                     
                </BlockchainWrapper>
        </DoctorBackground>
    )
}

export default Doctor
