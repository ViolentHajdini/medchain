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
    overflow-y:scroll;
    overflow-x:hidden;
    background :#EFEFE8FF;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`
export const ScannerWrapper = styled.div `
    width: 250px;
    height: 250px;
    z-index: 4;
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

export const Modal = styled.div.attrs((props)=>({
    clicked: props.bool,

}))`
    background-color:#EFEFE8FF;
    position:fixed;
    right:0%;
    top:0%;
    width:45vw;
    height:100vh; 
    display:${props => (props.clicked ? 'flex' : 'none')}; 
    align-items:center;
    flex-direction:column; 
    overflow-y:scroll; 

`

export const Blockchain = styled.div`
    background-color: #f4f4f2;
    width: 530px;
    color: white;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border:hidden;
    border-radius:12px;
    padding-top: 10px;
    padding-bottom: 20px;

`

export const Paragraph = styled.div`
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 14px;
    display:flex;
    align-items:flex-end;
    width: 350px;
    min-height: 100px;
    text-align:left;
    display: flex;
    justify-content: right;
    flex-direction: column;
    margin: 0;
    padding: 0;
    flex-direction: column;
    margin: 0px;
    padding: 0px;
    color: #495464;

`

export const CloseIcon = styled.div`
    position: fixed;
    right: 0;
    margin-right: 30px;
    margin-top: 5px;
    font-size: 2rem;
    cursor: pointer;
    color: #01bf71;
    font-weight: bold;
    &:hover{ 
        color: #00ab65;
    }
`

export const Header = styled.p`
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 15px;
    margin-left: 5px;
    margin-right: 5px;
    text-align:center;
    display:flex;
    align-items:right;
    justify-content:center;
    flex-direction:column;
    margin:0px;
    padding:0px;
`

export const Line = styled.div`
    word-wrap: break-word;
    width: 400px;
    height: max-content;
    margin: 5px;
    color: #495464;
`

export const Tags = styled.p `
    font-weight: 700;
    color: #495464
`