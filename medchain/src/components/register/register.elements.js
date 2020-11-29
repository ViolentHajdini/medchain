import styled from 'styled-components';
import photo from '../../media/photo.png'
import logo from '../../media/svgwhite.svg'

export const LogoM = styled.svg`
    background-image:url(${logo});
    display: flex;
    position: relative;
    background-repeat:no-repeat;
    width: 60px;
    height: 60px;
    background-position: center center; 
    margin-bottom: 2.5rem;
    margin-right: 15px;

`
export const LogoWrapper = styled.div`
    display: flex;
    position: relative;
    font-family: Montserrat;
    font-size: 3rem;
    font-weight: 500;
    justify-content: center;
    color: white;
`


export const RegisterBackground = styled.div`
    background: #24C889;
    display: flex;
    justify-content:center;
    align-items:center;
    width: 100%;
    height: 100vh;
    z-index: 1;
    position: relative;
    flex-direction: column;
`
export const RegisterContainer = styled.div`
    height: 500px;
    width: 1000px;
    display: flex;
    background-color: white; 
    z-index: 2;
    flex-direction: row;
    border: 0;
    text-decoration: none;
    outline: 0;

`

export const RegisterPhoto = styled.img`
    background-image: url(${photo});
    display:flex;
    position: relative;
    background-repeat:no-repeat;
    width: 500px;
    height: 500px;
    background-size: contain;
    background-position: center center;
    border: 0;
    text-decoration: none;
    outline: 0;
`

export const RegisterForm = styled.div`
    width: 500px;
    height: 500px;
    background-color: white;
    border: none;
`
