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
export const QRWrapper = styled.div`
    display:flex;
    position: relative;
    background-repeat:no-repeat;
    width: 450px;
    height: 300px;
    border: none;
    background-size: contain;
    background-position: center center;
    text-decoration: none;
    margin-left: 8px;
    align-items: center;
    justify-content: center;
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
    background: white;
    height: 600px;
    width: 50vw;
    overflow-y: scroll;
    display:flex;
    flex-direction: column;
    align-items: center; 
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

export const PatientInfo = styled.div`
    background: white;
`

export const InfoWrapper = styled.div`
    background: white;
    width: 480px;
    height: 280px;
    color: black;
    font-size: 7px;
    text-align: left;
    padding-left: 15px;
    padding-top: 10px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
`


export const Blockchain = styled.div `
    height: 100px;
    width: 100px;   
`

export const Tokens = styled.h1 `
    font-size: 15px;
    word-wrap: break-word;
    width: 400px;
    height: max-content;
    margin: 5px;
    color: #495464;
    padding-top: 10px;
`