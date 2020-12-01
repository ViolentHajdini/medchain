import React, {useState} from 'react'
import { Container, HeaderbtnWrapper, Header, Logo, LogoContainer, ArrowForward, ArrowRight, VideoBg, Background, Content } from './login.elements';
import sample from '../../video/video.mp4';
import SearchPage from '../Searchbar/searchbar.js';
import { Button } from './ButtonElement'
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Form from '../register/form'


const GreenCheckbox = withStyles({
    root: {
      color: "#01bf71",
      '&$checked': {
        color:"#01bf71",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);


function Login () {
    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }


    const [state, setState] = React.useState({
            patient: true,
            doctor: true,
    });
      
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };



    return (
        
        
        <Container>
            <Background>
                <VideoBg autoPlay loop muted src={sample} type='video/mp4' />
            </Background>
            <Content>
                <LogoContainer>
                    <Logo/> MedChain
                </LogoContainer>
                <Searchwrapper>
                    <form>
                        <Input type='text' placeholder='Please enter your key...'>
                        </Input>
                    </form>
                </Searchwrapper>
                {/* <FormGroup row>
                <FormControlLabel
                    control={<GreenCheckbox checked={state.doctor} onChange={handleChange} name="doctor" />}
                    label="Doctor"
                    style ={{
                        color: "white",
                      }}
                      />
                      
                <FormControlLabel
                    control={<GreenCheckbox checked={state.patient} onChange={handleChange} name="patient" />}
                    label="Patient"
                    style ={{
                        color: "white",
                      }}
                    />
                </FormGroup> */}

                <Form/>
                <HeaderbtnWrapper>
                <Button to ='cotact' 
                    onMouseEnter={onHover} 
                    onMouseLeave={onHover}
                >Find Blockchain {hover ? <ArrowForward /> : <ArrowRight />} 
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