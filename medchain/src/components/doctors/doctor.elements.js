import styled from 'styled-components';

export const DoctorBackground = styled.div`
    background: #24C889;
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
    background: red;
`

export const BlockchainWrapper = styled.div`
    width: 45vw;
    height: auto;
    //overflow-y: scroll;
    background :white;
    
`

export const Input = styled.input`
    width: 500px;
    height: 50px;
    background: green;
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