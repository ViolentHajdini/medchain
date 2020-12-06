import React, { useEffect, useState } from 'react'
import { PatientBackground, Logo, LogoWrp, BackgroundWrapper, PatientInfo, InfoWrapper, QRWrapper, Blockchain, BlockchainWrapper } from './patient.elements'
import { Redirect } from "react-router-dom";
import QRCode from "react-qr-code";

const Patient = props => {    
    const [blockchain,setBlockchain] = useState([]);
    console.log(props.id);
    const search = window.location.href;
    useEffect(()=>{
        fetch('/record/chain/cadd75339625c5401af9b5cce0b0d402f56c44891001a885ca93f8f24b48079f' ,{
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
    });
    

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
                <QRWrapper>
                    <QRCode value ='{"pubkey": 19872738923, "sig": 1278172hf1a96}'/> 
                </QRWrapper>
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
