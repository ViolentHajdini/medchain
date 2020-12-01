import React, { useEffect } from 'react'
import { PatientBackground, Logo, LogoWrp, BackgroundWrapper, PatientInfo, InfoWrapper, Photo, BlockchainWrapper } from './patient.elements'
import Blockchain from './blockchaincard'

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
                <Blockchain/>
            </BlockchainWrapper>
        </BackgroundWrapper>
        </PatientBackground>
    )  
}

export default Patient
