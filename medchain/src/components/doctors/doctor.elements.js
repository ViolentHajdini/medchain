import styled from 'styled-components';

export const DoctorBackground = styled.div`
    background: #EFEFE8FF;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    z-index: 1;
    position: relative;
    flex-direction: row;
`   

export const FormWrapper = styled.div`
    width: 55vw;
    height: 100%;
    background: #EFEFE8FF;
`

export const BlockchainWrapper = styled.form`
    width: 45vw;
    height: auto;
    //overflow-y: scroll;
    background :#EFEFE8FF;
  
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

export const InputButton = styled.input`
  width: 300px;
  background-color: #01bf71;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover{
    background-color: #00ab65;
  }
  &:focus{
        outline-width: 0;
    }
`

export const Paragraph = styled.p`
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 11px;
    display:flex
    align-items:flex-start;
`