import styled from 'styled-components';
import logo from '../../media/svgwhite.svg'
import {MdKeyboardArrowRight, MdArrowForward} from 'react-icons/md'



export const Container = styled.div`
    background: #0c0c0c;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    position: relative;
    z-index: 1;
    &:before{
        content: '';
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        z-index:2;
        background: linear-gradient(180deg, rgba(0,10,14,.3) 0%, rgba(0,4,10,.8) 100%), linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%);
    }
`;

export const Background = styled.div`
    position: absolute;
    top: 0;
    right:0;
    bottom: 0;
    left: 0%;
    width: 100%;
    height: 100%;
    overflow: hidden;

`;

export const VideoBg = styled.video`
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    background: white;
`

export const Content = styled.form`
    z-index: 3;
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 50vw;
    align-items: center;
    justify-content: center;

`;

export const LogoContainer = styled.div`
    height: 220px;
    width: 380px;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align:center;
    font-size: 3rem;
    color: white;
    font-weight: 500;
`

export const Logo = styled.svg`
    background-image:url(${logo});
    display: flex;
    position: relative;
    background-repeat:no-repeat;
    width: 100px;
    height: 100px;
`
export const HeaderbtnWrapper = styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;

`

export const ArrowForward = styled(MdArrowForward)`
    margin-left: 8px;
    font-size: 20px;

`
export const ArrowRight = styled(MdKeyboardArrowRight)`
    margin-left: 8px;
    font-size: 20px;
`

export const Header = styled.h1`
    color: white;
    font-weight: 500;
    font-size: .8rem;
    margin-top: 20px;
`
export const Button = styled.button`
    display: inline-block;
    border-radius: 50px;
    background: ${({primary}) => (primary ? '#01bf71' : '#01606')};
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px' : '12px 30px')};
    color: ${({dark}) => (dark ? '#28df99' : '#fff')};
    font-size:${({fontBig}) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    border: .15rem solid #28df99;
    padding-right: 15px;
    margin-top: 13px;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: ${({primary}) => (primary ? '#fff' : '#28df99')};
    }
`