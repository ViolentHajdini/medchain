import React, { useEffect, useState } from 'react'
import { PatientBackground, Logo, LogoWrp, BackgroundWrapper, PatientInfo, InfoWrapper, Photo, Blockchain, BlockchainWrapper } from './patient.elements'
import { Redirect } from "react-router-dom";

const Patient = props => {    
    const [blockchain,setBlockchain] = useState([]);
    console.log(props.id);
    const search = window.location.href;
    const handleEffect = () =>{
        fetch('/record/chain/' + props.id ,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(response => {
                console.log(response.status);
                console.log(search);
                
                return response.json();
            })
            .then(data => {
                setBlockchain(data);
                console.log('Success:', data);
              
            })
            .catch((error) => {
                console.error('Error:', error);
              });
    };
    

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
                    <h1>key:{props.id}</h1>
                    <button onClick={handleEffect}> click </button>
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
