import styled from 'styled-components';

export const FormWrapper = styled.form`
   width:500px;
   margin: 10px;
   display: flex;
   flex-direction: column;
   border-radius: 4px; 
`

export const Inputtxt = styled.input`
   width:350px;
   padding: 14px 20px;
   margin: 6px 0; 
   display: flex;
   border: 1px solid #ccc;
   border-radius: 3px;
   &:focus{
        outline-width: 0;
    }
`

export const Inputbtn = styled.input`
  width: 390px;
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

export const Select = styled.select`
    width: 393px;
    padding: 6px 15px;
    margin-top: 8px;
    margin-left: 40px;
    margin-bottom: 15px;
    color: #01bf71;
    border-radius: 3px;
    border: 1px solid #ccc;
    overflow: hidden;
    &:focus{
        outline-width: 0;
    }
    &:after{

    }
`
