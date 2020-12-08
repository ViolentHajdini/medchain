import React, {useState} from 'react'
import { Container, HeaderbtnWrapper, Logo, LogoContainer, VideoBg, Background, Content ,QRWrapper} from './login.elements';
import sample from '../../video/video.mp4';
import { Button } from './ButtonElement'
import { FormWrapper, Select } from '../register/form.elements'
import { Searchwrapper, Input } from '../Searchbar/searchbar.elements'
import { Redirect } from "react-router-dom";

const axios = require('axios');
const crypto = require('crypto');


export const Login = props => {
    const [hover, setHover] = useState(false)
    const [key, setKey] = useState("");
    const [opt, setOpt] = useState("doctor");
    const [auth, setAuth] = useState(false);
    const onHover = () => {
        setHover(!hover)
    }

    const handleSubmit = e => {
        e.preventDefault();
        // .catch(()=>{
        //     alert("ID does not match any in the database");
        // })
        // User submits their public key and checks
        // for the hashed Pk in the database
        const hash = crypto.createHash('sha256');
        hash.update(key.toString('utf8'));
        const addr = hash.digest('hex');
        
        axios.get(`/search/${opt}/${addr}`).then(res => {
            if (res.data.error) { alert(res.data.error); }
            else { setAuth(true); }
        });
        props.handleAlter(key);
    }


    return (
        <Container>
            { auth === true ? opt === "doctor" ? <Redirect to="/doctor"/> : <Redirect to="/patient/:id"/> : null}
            <Background>
                <VideoBg autoPlay loop muted src={sample} type='video/mp4' />
            </Background>
            <Content onSubmit={handleSubmit}>
                <LogoContainer>
                    <Logo/> MedChain
                </LogoContainer>
                <Searchwrapper>
                        <Input type='text' 
                               placeholder='Please enter your key...'   
                               value={key} 
                               onChange={ e => setKey(e.target.value)}
                        />
                </Searchwrapper>
                <div>
                    <FormWrapper onSubmit={handleSubmit}>
                        <Select value={opt} onChange={e => setOpt(e.target.value)}>
                            <option value="doctor"> Doctor </option>
                            <option value="patient"> Patient </option>
                        </Select>
                    </FormWrapper>
                </div>
                <HeaderbtnWrapper>

                    <Button  type='submit' value="Find Blockchain"
                        onMouseEnter={onHover} 
                        onMouseLeave={onHover}
                    />
                </HeaderbtnWrapper>
            </Content>
        </Container>
    )
};