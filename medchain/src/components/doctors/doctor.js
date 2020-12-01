import React, { useState } from 'react';
import { ArrowForward, ArrowRight } from '../LogIn/login.elements';
import { DoctorBackground, FormWrapper, BlockchainWrapper, Paragraph, Header } from './doctor.elements';
import  MedicalForm  from './medicalform';
import FindPatient  from './find';
import { Input, InputButton } from './find.elements'
import testjson from './test.json';


const Doctor = () => {

    const [hover, setHover] = useState(false);
    const [key, setKey] = useState('');
    const [blockchain,setBlockchain] = useState(testjson.chain);
    const [clicked, setClicked] = useState(false);
    const data1 = '/cadd75339625c5401af9b5cce0b0d402f56c44891001a885ca93f8f24b48079f'
    const onHover = () => {
        setHover(!hover)
    };

    const handleSubmit = e => {
        console.log(key);


        fetch('/record/chain/' + key, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(response => response.json())
            .then(data => {
                setBlockchain(data);
                console.log('Success:', data);
               
            })
            .catch((error) => {
                console.error('Error:', error);
              });
        setClicked(true);
        setKey('');

        e.preventDefault();
       
    }

    const handleChange = (event) =>{
        setKey(event.target.value);
        console.log('change handled');
    }
    const closeModal = () =>{
        setClicked(false);
    }
   
   
    return (
        <DoctorBackground>
                <FormWrapper>
                    <MedicalForm />
                </FormWrapper>
                <div style={(clicked && blockchain !== 0 ) ? {backgroundColor:"#EFEFE8FF",position:"fixed",right:"0%",top:"0%",width:"45vw", height:"100vh", display:"flex", alignItems:"center",flexDirection:"column", overflow:"scroll"} : {display:"none"}}>
                    <div style={{position:"fixed",right:"0%",fontSize:"2.5rem",cursor:"pointer"}} onClick={closeModal} >X</div>
                    {blockchain.map(function(data,index) {
                    return( 
                        <div style={{border:"2px dotted purple",width:"max-content"}} key={index}> 
                            <Header>index:{data.index}  </Header>
                            <Paragraph> 
                                timestamp: {data.timestamp}
                                <br/> hospital: {data.hospital}
                                <br/> diagnosis: {data.diagnosis}
                                <br/> perscription: {data.perscription}
                                <br/> comment: {data.comment}
                                <br/> previous: {data.previous_hash}     
                            </Paragraph>

                        </div>
                    )})}
                </div>
            
                <BlockchainWrapper onSubmit={handleSubmit} >
                    <Input placeholder="ID" value={key} onChange={handleChange}/>
                    <InputButton type='submit' value="Find Patients Blockchain" />  
                </BlockchainWrapper>
        </DoctorBackground>
    )
}

export default Doctor
