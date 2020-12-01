import styled from 'styled-components'

export const Button = styled.input`
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