import styled from 'styled-components';

export const Input = styled.input`
    width: 450px;
    padding: 15px 18px;
    border: 1px solid #ccc;
    border-radius: 4px; 
    &:focus{
        outline-width: 0;
    }
    background: white;
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