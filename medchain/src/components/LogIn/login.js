import React, {useState} from 'react'
import { Container, HeaderbtnWrapper, Header, Logo, LogoContainer, ArrowForward, ArrowRight, VideoBg, Background, Content } from './login.elements';
import sample from '../../video/video.mp4';
import SearchPage from '../Searchbar/searchbar.js';
import { Button } from './ButtonElement'

function Login () {
    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    const [hover2, setHover2] = useState(false)

    const onHover2 = () => {
        setHover2(!hover2)
    }

    return (
        
        
        <Container>
            <Background>
                <VideoBg autoPlay loop muted src={sample} type='video/mp4' />
            </Background>
            <Content>
                <LogoContainer>
                    <Logo/> MedChain
                </LogoContainer>
                <SearchPage />
                <HeaderbtnWrapper>
                <Button to ='cotact' 
                    onMouseEnter={onHover} 
                    onMouseLeave={onHover}
                >Find Blockchain {hover ? <ArrowForward /> : <ArrowRight />} 
                </Button>
            </HeaderbtnWrapper>
            <Header>If you do not have one, create one here</Header>
            <HeaderbtnWrapper style={{paddingRight: "50px", paddingLeft: "50px" }}>
                <Button to ='cotact' 
                    onMouseEnter={onHover2} 
                    onMouseLeave={onHover2}
                    style={{paddingRight: "30px", paddingLeft: "39px" }}
                >Create New One {hover2 ? <ArrowForward /> : <ArrowRight />} 
                </Button>
            </HeaderbtnWrapper>
            </Content>
        </Container>
    )
}

export default Login

{/* <video className='videoTag' autoPlay loop muted>
    <source src={sample} type='video/mp4' />
</video> */}