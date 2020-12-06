import React, { useState } from 'react';
import { DoctorBackground, FormWrapper, Blockchain, BlockchainWrapper,CloseIcon, Paragraph, Line, Modal, Tags } from './doctor.elements';
import  MedicalForm  from './medicalform';
import { Input, InputButton } from './find.elements'
import testjson from './test.json';


const Doctor = props => {

   
    const [key, setKey] = useState('');
    const [blockchain,setBlockchain] = useState(testjson.chain);
    const [clicked, setClicked] = useState(false);
    const data1 = 'cadd75339625c5401af9b5cce0b0d402f56c44891001a885ca93f8f24b48079f'
    const [stat,setStat]= useState('');
   
   
    const handleRemount = () =>{
       getData();
    }

    const handleSubmit = e => {
        console.log(key);

        getData();
        
        //setKey('');

        e.preventDefault();
       
    }

    const getData = () =>{
        fetch('/record/chain/' + key, {
            method: 'GET',
            headers: {  
                'Content-Type': 'application/json',
            },
            })
            .then(response => {
                setStat(response.status);
                if(response.ok){
                    setClicked(true);
                    console.log('here');
                }
                if(!response.ok){
                    setClicked(false);
                    console.log('here1');
                    setKey('');
                    
                }
                console.log(response.status);
                return response.json();
            })
            .then(data => {
                setBlockchain(data);
                
                console.log('Success:', data);
              
            })
            .catch((error) => {
                console.error('Error:', error);
              });

    }


    const handleChange = (event) =>{
        setKey(event.target.value);
        console.log('change handled');
    }
    const closeModal = () =>{
        setKey('');
        setClicked(false);
        
    }

    const test = () =>{
        console.log(key);
    }
   
   
    return (
        <DoctorBackground>
                <FormWrapper>
                    <MedicalForm handleRemount={handleRemount} />
                </FormWrapper>
                <Modal bool={clicked}>
                    <CloseIcon onClick={closeModal}> X </CloseIcon>
                    {blockchain.map(function(data,index) {
                    return( 
                       <Blockchain key={index}> 
                                <Line>Record: {data.index}</Line> 
                            <Paragraph> 
                                <Line> <Tags>TIMESTAMP:</Tags> {data.timestamp}</Line>
                                <Line> <Tags> HOSPITAL:</Tags> {data.hospital}</Line>
                                <Line><Tags>DIAGNOSIS:</Tags>  {data.diagnosis}</Line>
                                <Line><Tags>PERSCRIPTION:</Tags>  {data.perscription}</Line>
                                <Line><Tags>COMMENT:</Tags>  {data.comment}</Line>
                                {/* <Line><Tags>PREVIOUS HASH:</Tags>  {data.previous_hash}</Line>          */}
                            </Paragraph>
                        </Blockchain>
                    )})}
                </Modal>
            
                <BlockchainWrapper onSubmit={handleSubmit} >
                    <Input placeholder="ID" value={key} onChange={handleChange}/>
                    <InputButton type='submit' value="Find Patients Blockchain" />  
                </BlockchainWrapper>
        </DoctorBackground>
    )
}

export default Doctor
