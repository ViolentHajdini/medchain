import styled from 'styled-components';

export const Form = styled.form`
    color: black;
`

export const blockBtn = styled.input`
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

export const MedicalFormWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const Inputs = styled.input`
    width: 250px;
    padding: 15px 20px;
    margin: 10px;
    display: flex;
    border: 1px solid #ccc;
    border-radius: 3px;
    &:focus{
        outline-width: 0;
    }
`

export const InputWrapperOne = styled.div`
    display: flex;
    flex-direction: row;
`
export const InputsTwo = styled.textarea`
    width: 563px;
    height: 200px;
    padding: 15px 20px;
    margin: 10px;
    display: flex;
    border: 1px solid #ccc;
    resize: none;
    border-radius: 3px;
    &:focus{
        outline-width: 0;
    }  
    text-align: top;
`
export const InputsThree = styled.input`
    width:563px;
    padding: 15px 20px;
    margin: 10px;
    display: flex;
    border: 1px solid #ccc;
    border-radius: 3px;
    &:focus{
        outline-width: 0;
    }

`

