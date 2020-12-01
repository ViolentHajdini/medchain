import React from 'react'
import { PatientBackground, Logo, LogoWrp, BackgroundWrapper, PatientInfo, InfoWrapper, Photo, BlockchainWrapper, Blockchain } from './patient.elements'

const Patient = () => {
    return (
        <PatientBackground>
            <LogoWrp>
                <Logo>
                </Logo>
                MedChain
            </LogoWrp>
            <BackgroundWrapper>  
            <PatientInfo>
                <InfoWrapper>
                    <h1>Name</h1>
                    <h1>Age</h1>
                    <h1>Blood Type</h1>
                    <h1>Alergies</h1>
                </InfoWrapper>
                <Photo>
                </Photo>
            </PatientInfo>
            <BlockchainWrapper>
                <Blockchain>
                </Blockchain>
            </BlockchainWrapper>
        </BackgroundWrapper>
        </PatientBackground>
    )  
}

export default Patient
