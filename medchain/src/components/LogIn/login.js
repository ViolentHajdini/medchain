import React, {useState} from 'react'
import { Container, HeaderbtnWrapper, Logo, LogoContainer, VideoBg, Background, Content ,QRWrapper} from './login.elements';
import sample from '../../video/video.mp4';
import { Button } from './ButtonElement'
import { FormWrapper, Select } from '../register/form.elements'
import { Searchwrapper, Input } from '../Searchbar/searchbar.elements'
import { Redirect } from "react-router-dom";
import { Scanner } from "../qrcode/scanner";
const axios = require('axios');


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
        axios.get(`/search/${opt}/${key}`).then(res => {
            if (res.data.error) { alert(res.data.error); }
            else { setAuth(true); }
        });
        props.handleAlter(key);
    }


    return (
        <Container>
            { auth === true ? opt === "doctor" ? <Redirect to="/doctor"/> : <Redirect to="/patient/:id"/>: null}
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
                {/* <QRWrapper>
                    <Scanner/>
                </QRWrapper> */}
            </Content>
        </Container>
    )
};