import styled from 'styled-components';
import token from '../../media/blocksvg.svg'
import photo from '../../media/photo.png'

export const PatientBackground = styled.div`
    background: #EFEFE8FF;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    z-index: 1;
` 

export const BackgroundWrapper = styled.div`
    display:flex;
    flex-direction: row;
`

export const Logo = styled.svg`
    background-image:url(${token});
    display: flex;
    position: relative;
    background-repeat:no-repeat;
    width: 35px;
    height: 35px;
    background-position: center center; 
    margin-bottom: 2.5rem;
    margin-right: 10px;
`

export const BlockchainWrapper = styled.div`
    background: red;
    height: 300px;
    width: 50vw;
`

export const LogoWrp = styled.div`
    display: flex;
    position: relative;
    font-family: Montserrat;
    font-size: 1.9rem;
    font-weight: 500;
    justify-content: center;
    color: white;
    margin-top: 1rem;
    color: black;
`

export const Blockchain = styled.div`
    width: 100px; 
    height: 100px;
    color: yellow;
`

export const PatientInfo = styled.div`
    background: white;
`

export const InfoWrapper = styled.div`
    background: white;
    width: 480px;
    height: 280px;
    color: black;
    font-size: .7rem;
    text-align: left;
    padding-left: 15px;
    padding-top: 10px;

`

export const Photo = styled.img`
    background-image: url(${photo});
    display:flex;
    position: relative;
    background-repeat:no-repeat;
    width: 480px;
    height: 280px;
    border: none;
    background-size: contain;
    background-position: center center;
    border: 0;
    text-decoration: none;
    outline: 0;
    border: hidden;
`