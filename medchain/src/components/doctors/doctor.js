import React, { useState, useEffect } from 'react';
import { DoctorBackground, FormWrapper, Blockchain, BlockchainWrapper,CloseIcon, Paragraph, Line, Modal, Tags } from './doctor.elements';
import  MedicalForm  from './medicalform';
import QrReader from 'react-qr-reader';


const Doctor = props => {

    console.log(props.id);
    const [key, setKey] = useState('');
    const [blockchain,setBlockchain] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [remount,setRemount] = useState(false);
    const [token, setToken] = useState([]);

    useEffect(()=> {
        if (remount && clicked){
            getData();
            setRemount(false);
        }
    });

    const handleScan = data => {
        if (data) {
            let temp = JSON.parse(data);
            setToken([temp.pubkey,temp.sig]);
            setClicked(true);
            if(temp.pubkey.length > 0){
                setKey(temp.pubkey);
                setRemount(true);
            }
            console.log('scanned');
        }
      }
      
      const handleError = err => {
        console.error(err);
      }
   
    const handleRemount = (data) =>{
        setRemount(data);
    }

    const getData = () =>{
        fetch('/record/chain/' + key, {
            method: 'GET',
            headers: {  
                'Content-Type': 'application/json',
            },
            })
            .then(response => {
                if(response.ok){
                    setClicked(true);  
                }
                if(!response.ok){
                    setClicked(false); 
                    setKey('');  
                    alert('ID could not be found');              
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

    const closeModal = () =>{
        setKey('');
        setClicked(false);
        setToken([]);
    }

    const onlyOneBlock = (data) =>{
        setClicked(data);
    }
   
    return (
        <DoctorBackground>
                <FormWrapper>
                    <MedicalForm onlyOneBlock={onlyOneBlock} check={clicked} pubkey={token[0]} sig={token[1]} handleRemount={handleRemount} />
                    {console.log(key)}
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
                            </Paragraph>
                        </Blockchain>
                    )})}
                </Modal>
                <BlockchainWrapper>
                    {!clicked ? <div style={{height:"300px", width: "300px" }}>
                        <QrReader
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
                            style={{ width: '100%' }}
                        />
                    </div> : null}
                </BlockchainWrapper>
        </DoctorBackground>
    )
}

export default Doctor
