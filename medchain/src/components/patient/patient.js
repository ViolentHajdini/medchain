import React, { useEffect, useState } from 'react'
import { PatientBackground, Logo, Tokens, LogoWrp, BackgroundWrapper, PatientInfo, InfoWrapper, QRWrapper, BlockchainWrapper } from './patient.elements'
import QRCode from "react-qr-code";
import { Blockchain, Line, Tags, Paragraph } from '../doctors/doctor.elements';

const Patient = props => {    
    const [blockchain,setBlockchain] = useState([]);
    const [patientInfo,setPatientInfo] = useState([]);

    useEffect(()=>{
        if(blockchain.length === 0 && props.id !== ''){
            handleEffect();
        }
    });
    


    
    const handleEffect = () =>{
        fetch('/record/chain/' + props.id ,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(response => {
                console.log(response.status);
                return response.json();
            })
            .then(data => {

                setBlockchain(data);
                setPatientInfo([data[0].name, data[0].dob , data[0].bloodType, data[0].allergies]);
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
                    <Tokens>Name: {patientInfo[0]} </Tokens>
                    <Tokens>Age: {patientInfo[1]}</Tokens>
                    <Tokens>Blood Type: {patientInfo[2]}</Tokens>
                    <Tokens>Alergies: {patientInfo[3]}</Tokens>
                    <Tokens>PubKey: {props.id}</Tokens>
                </InfoWrapper>
                <QRWrapper>
                    <QRCode value ={'{"pubkey": "' + props.id +'" ,"sig": "1278172hf1a96"}'}/> 
                </QRWrapper>
            </PatientInfo>
            <BlockchainWrapper>
            {blockchain.map(function(data,index) {
                    return( 
                       <Blockchain key={index}> 
                                <Line>Record: {data.index}</Line> 
                            <Paragraph> 
                                <Line> <Tags>TIMESTAMP:</Tags> {data.timestamp} </Line>
                                <Line> <Tags> HOSPITAL:</Tags> {data.hospital}  </Line>
                                <Line> <Tags>DIAGNOSIS:</Tags>  {data.diagnosis}</Line>
                                <Line> <Tags>PERSCRIPTION:</Tags>  {data.perscription}</Line>
                                <Line> <Tags>COMMENT:</Tags>  {data.comment}</Line>
                                {/* <Line><Tags>PREVIOUS HASH:</Tags>  {data.previous_hash}</Line>          */}
                            </Paragraph>
                        </Blockchain>
                    )})}
            </BlockchainWrapper>
        </BackgroundWrapper>
        </PatientBackground>
    )  
}

export default Patient
