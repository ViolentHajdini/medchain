import React from 'react'
import { RegisterBackground, LogoWrapper, LogoM, RegisterContainer, RegisterPhoto, RegisterForm } from './register.elements';
import Form from './form';

const Register = () => {
    return (
        <RegisterBackground>
            <LogoWrapper>
                <LogoM>
                </LogoM>
                MedChain
            </LogoWrapper>
            <RegisterContainer>
                <RegisterPhoto>
                </RegisterPhoto>
                <RegisterForm>
                    <Form></Form>
                </RegisterForm>
            </RegisterContainer>
        </RegisterBackground>

    )
}

export default Register
